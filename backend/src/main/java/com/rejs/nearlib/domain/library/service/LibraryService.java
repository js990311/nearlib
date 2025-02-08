package com.rejs.nearlib.domain.library.service;

import com.rejs.nearlib.domain.library.dto.LibraryDto;
import com.rejs.nearlib.domain.library.dto.NearLibraryDto;
import com.rejs.nearlib.domain.library.entity.Library;
import com.rejs.nearlib.domain.library.repostory.LibraryQueryRepository;
import com.rejs.nearlib.domain.library.repostory.LibraryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class LibraryService {
    private final LibraryRepository libraryRepository;
    private final LibraryQueryRepository libraryQueryRepository;

    public LibraryDto findById(Long id){
        Library library = libraryRepository.findById(id).orElseThrow();
        return LibraryDto.of(library);
    }

    public List<NearLibraryDto> findNearLibraries(Double latitude, Double longitude, Integer range){
        return libraryQueryRepository.findNearLibraries(latitude, longitude, range);
    }

    public List<LibraryDto> findAll(){
        List<Library> libraries = libraryRepository.findAll();
        return libraries.stream().map(LibraryDto::of).toList();
    }

    public List<Long> findAllId(){
        return libraryRepository.findAllId();
    }

    public Page<LibraryDto> search(String name, int page, int size){
        return libraryRepository.findByNameContaining(name, PageRequest.of(page, size)).map(LibraryDto::of);
    }
}
