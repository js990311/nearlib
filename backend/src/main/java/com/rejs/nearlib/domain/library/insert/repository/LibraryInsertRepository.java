package com.rejs.nearlib.domain.library.insert.repository;

import com.rejs.nearlib.domain.library.insert.dto.LibraryTuple;
import com.rejs.nearlib.domain.library.insert.repository.mapper.LibraryInsertMapper;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.ExecutorType;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Transactional
@Repository
public class LibraryInsertRepository {
    private final LibraryInsertMapper libraryInsertMapper;
    private final SqlSessionFactory sqlSessionFactory;

    public void batchInsert(List<LibraryTuple> tuples){
        SqlSession session = sqlSessionFactory.openSession(ExecutorType.BATCH, false);
        LibraryInsertMapper mapper = session.getMapper(LibraryInsertMapper.class);
        for(LibraryTuple library : tuples){
            mapper.insertLibrary(library);
        }
        session.flushStatements();
        session.commit();
    }
}
