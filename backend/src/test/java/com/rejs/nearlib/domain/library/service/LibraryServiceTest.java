package com.rejs.nearlib.domain.library.service;

import com.rejs.nearlib.domain.library.dto.NearLibraryDto;
import com.rejs.nearlib.global.AbstractTestContainerTest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.springframework.beans.factory.annotation.Autowired;

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


}