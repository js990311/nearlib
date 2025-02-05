package com.rejs.nearlib.domain.library.repostory;

import com.rejs.nearlib.domain.library.dto.NearLibraryDto;
import com.rejs.nearlib.domain.library.repostory.mapper.LibraryQueryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Repository
public class LibraryQueryRepository {
    private final LibraryQueryMapper libraryQueryMapper;

    public List<NearLibraryDto> findNearLibraries(Double latitude, Double longitude, Integer range){
        return libraryQueryMapper.findNearLibrary(latitude, longitude, range);
    }
}
