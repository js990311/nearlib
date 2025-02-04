package com.rejs.nearlib.domain.library.service;

import com.rejs.nearlib.domain.library.dto.LibraryDto;
import com.rejs.nearlib.domain.library.entity.Library;
import com.rejs.nearlib.domain.library.repostory.LibraryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class LibraryService {
    private final LibraryRepository libraryRepository;

    public LibraryDto findById(Long id){
        Library library = libraryRepository.findById(id).orElseThrow();
        return LibraryDto.of(library);
    }
}
