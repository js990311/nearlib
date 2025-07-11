package com.rejs.nearlib.domain.library.service;

import com.rejs.nearlib.domain.library.dto.LibraryDto;
import com.rejs.nearlib.domain.library.dto.NearLibraryDto;
import com.rejs.nearlib.global.AbstractTestContainerTest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;


class LibraryServiceTest extends AbstractTestContainerTest {
    @Autowired
    private LibraryService libraryService;

    @Test
    void findById() {
        Long id = 1L;
        String name = "서울검색도서관";
        String address = "테스트 주소";
        Double lng = 127.02;
        Double lat = 37.58;
        String webpage = "library.webpage";
        LibraryDto library = libraryService.findById(1L);

        assertEquals(id, library.getId());
        assertEquals(name, library.getName());
        assertEquals(address, library.getAddress());
        assertEquals(lat, library.getLatitude());
        assertEquals(lng, library.getLongitude());
        assertEquals(webpage, library.getWebpage());
    }

    @Test
    void findAllId() {
        List<Long> allId = libraryService.findAllId();
        List<Long> expected = new ArrayList<>();
        for(long i=1;i<=20;i++){
            expected.add(i);
        }
        assertEquals(expected.size(), allId.size());
        assertIterableEquals(expected, allId);
    }
}