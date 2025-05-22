package com.rejs.nearlib.domain.library.repostory.search;

import com.rejs.nearlib.domain.library.dto.LibraryDto;
import com.rejs.nearlib.domain.library.entity.Library;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.hibernate.search.engine.search.query.SearchResult;
import org.hibernate.search.engine.spatial.DistanceUnit;
import org.hibernate.search.engine.spatial.GeoPoint;
import org.hibernate.search.mapper.orm.Search;
import org.hibernate.search.mapper.orm.session.SearchSession;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.geo.Distance;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Repository
public class LibrarySearchRepository {
    private final EntityManager entityManager;

    public Page<LibraryDto> searchByName(String name, Pageable pageable){
        SearchSession searchSession = Search.session(entityManager);

        SearchResult<Library> result = searchSession.search(Library.class)
                .where(f -> f.match().fields("name").matching(name))
                .fetch((int) pageable.getOffset(), pageable.getPageSize());

        return PageableExecutionUtils.getPage(result.hits().stream().map(LibraryDto::of).toList(), pageable, ()->result.total().hitCount());
    }

    public List<String> autoCompleteByName(String name){
        SearchSession searchSession = Search.session(entityManager);

        List<String> names = searchSession.search(Library.class)
                .select(f -> f.field("name", String.class))
                .where(f -> f.match().fields("name").matching(name))
                .fetchHits(15);

        // 중복 제거
        return names.stream().distinct().collect(Collectors.toList());
    }

    /**
     *
     * @param latitude
     * @param longitude
     * @param distance 미터 단위
     */
    public Page<LibraryDto> searchByLocation(double latitude, double longitude, double distance, Pageable pageable){
        SearchSession searchSession = Search.session(entityManager);

        SearchResult<Library> result = searchSession.search(Library.class)
                .where(f->f.spatial()
                        .within().field("location")
                        .circle(latitude, longitude, distance)
                ).sort(f->f.distance("location", GeoPoint.of(latitude, longitude)).asc())
                .fetch((int) pageable.getOffset(), pageable.getPageSize());
        return PageableExecutionUtils.getPage(result.hits().stream().map(LibraryDto::of).toList(), pageable, ()->result.total().hitCount());
    }

}
