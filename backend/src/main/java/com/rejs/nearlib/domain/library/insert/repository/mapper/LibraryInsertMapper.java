package com.rejs.nearlib.domain.library.insert.repository.mapper;

import com.rejs.nearlib.domain.library.insert.dto.LibraryTuple;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface LibraryInsertMapper {
    void insertLibraries(@Param("list") List<LibraryTuple> libraries);
    void insertLibrary(@Param("library") LibraryTuple library);
}
