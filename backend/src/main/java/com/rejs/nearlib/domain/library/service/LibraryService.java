package com.rejs.nearlib.domain.library.service;

import com.rejs.nearlib.domain.library.dto.LibraryDto;
import com.rejs.nearlib.domain.library.dto.NearLibraryDto;
import com.rejs.nearlib.domain.library.entity.Library;
import com.rejs.nearlib.domain.library.repostory.LibraryQueryRepository;
import com.rejs.nearlib.domain.library.repostory.LibraryRepository;
import com.rejs.nearlib.domain.library.repostory.search.LibrarySearchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class LibraryService {
    private final LibraryRepository libraryRepository;
    private final LibraryQueryRepository libraryQueryRepository;
    private final LibrarySearchRepository librarySearchRepository;

    public LibraryDto findById(Long id){
        Library library = libraryRepository.findById(id).orElseThrow();
        return LibraryDto.of(library);
    }

    public Page<NearLibraryDto> findNearLibraries(Double latitude, Double longitude, Integer range, int page, int size){
        return librarySearchRepository.searchByLocation(latitude, longitude, range, PageRequest.of(page,size));
    }

    public List<Long> findAllId(){
        return libraryRepository.findAllId();
    }

    public Page<LibraryDto> searchByEngine(String name, int page, int size){
        return librarySearchRepository.searchByName(name, PageRequest.of(page, size));
    }

    public List<String> autoCompleteByName(String name){
        return librarySearchRepository.suggestByName(name);
    }
}
