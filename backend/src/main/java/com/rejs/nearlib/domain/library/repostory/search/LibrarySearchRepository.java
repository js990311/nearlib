package com.rejs.nearlib.domain.library.repostory.search;

import com.rejs.nearlib.domain.library.dto.LibraryDto;
import com.rejs.nearlib.domain.library.entity.Library;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.hibernate.search.engine.search.query.SearchResult;
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
                .where(f -> f.match().fields("name").matching(name))
                .fetch((int) pageable.getOffset(), pageable.getPageSize());

        return PageableExecutionUtils.getPage(result.hits().stream().map(LibraryDto::of).toList(), pageable, ()->result.total().hitCount());
    }
}
