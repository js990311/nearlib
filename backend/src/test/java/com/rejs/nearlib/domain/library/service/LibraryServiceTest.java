package com.rejs.nearlib.domain.library.service;

import com.rejs.nearlib.domain.library.dto.LibraryDto;
import com.rejs.nearlib.domain.library.dto.NearLibraryDto;
import com.rejs.nearlib.global.AbstractTestContainerTest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;


class LibraryServiceTest extends AbstractTestContainerTest {
    @Autowired
    private LibraryService libraryService;

    @Test
    void findNearLibraries() {
        List<NearLibraryDto> nearLibraries = libraryService.findNearLibraries(37.58, 127.02, 10_000);
        assertEquals(10, nearLibraries.size());
    }


    @Test
    void search() {
        Page<LibraryDto> target = libraryService.search("검색", 0, 20);
        assertEquals(4, target.getNumberOfElements());

    }

    @Test
    void search2() {
        Page<LibraryDto> target = libraryService.search("도서관", 1, 10);
        assertEquals(10, target.getNumberOfElements());
        assertEquals(20, target.getTotalElements());
        assertEquals(2, target.getTotalPages());
        assertEquals(1, target.getNumber());
    }

    @Test
    void findAllId() {
        List<Long> allId = libraryService.findAllId();
        assertEquals(20, allId.size());
    }
}