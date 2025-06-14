package com.rejs.nearlib.domain.library.repostory.search;

import com.rejs.nearlib.domain.library.dto.LibraryDto;
import com.rejs.nearlib.domain.library.dto.NearLibraryDto;
import com.rejs.nearlib.domain.library.entity.Library;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.hibernate.search.engine.search.query.SearchResult;
import org.hibernate.search.engine.spatial.GeoPoint;
import org.hibernate.search.mapper.orm.Search;
import org.hibernate.search.mapper.orm.session.SearchSession;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Repository
public class LibrarySearchRepository {
    private final EntityManager entityManager;

    public Page<LibraryDto> searchByName(String name, Pageable pageable){
        SearchSession searchSession = Search.session(entityManager);

        SearchResult<Library> result = searchSession.search(Library.class)
                .where(f -> f.match().fields("name").matching(name).fuzzy(1))
                .fetch((int) pageable.getOffset(), pageable.getPageSize());

        return PageableExecutionUtils.getPage(result.hits().stream().map(LibraryDto::of).toList(), pageable, ()->result.total().hitCount());
    }

    public List<String> suggestByName(String name){
        return this.suggestByName(name, 7);
    }

    public List<String> suggestByName(String name, int hits){
        SearchSession searchSession = Search.session(entityManager);

        return searchSession
                .search(Library.class)
                .select(f -> f.field("name-suggestion", String.class))
                .where(f -> f.prefix().field("name-suggestion").matching(name))
                .fetchHits(hits);
    }


    /**
     *
     * @param latitude
     * @param longitude
     * @param distance 미터 단위
     */
    public Page<NearLibraryDto> searchByLocation(double latitude, double longitude, double distance, Pageable pageable){
        SearchSession searchSession = Search.session(entityManager);

        GeoPoint center = GeoPoint.of(latitude, longitude);

        SearchResult<NearLibraryDto> result = searchSession
                .search(Library.class)
                .select(f->f.composite(
                        NearLibraryDto::new,
                        f.entity(),
                        f.distance("location", center)
                ))
                .where(f->f.spatial()
                        .within().field("location")
                        .circle(center, distance)
                ).sort(f->f.distance("location", center).asc())
                .fetch((int) pageable.getOffset(), pageable.getPageSize());
        return PageableExecutionUtils.getPage(result.hits(), pageable, ()->result.total().hitCount());
    }

}
