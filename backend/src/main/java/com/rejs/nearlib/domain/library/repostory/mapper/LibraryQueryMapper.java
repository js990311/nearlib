package com.rejs.nearlib.domain.library.repostory.mapper;

import com.rejs.nearlib.domain.library.dto.NearLibraryDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface LibraryQueryMapper {
    List<NearLibraryDto> findNearLibrary(
            @Param("latitude") Double latitude,
            @Param("longitude") Double longitude,
            @Param("range") Integer range
    );
}
