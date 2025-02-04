package com.rejs.nearlib.domain.library.controller;

import com.rejs.nearlib.domain.library.dto.LibraryDto;
import com.rejs.nearlib.domain.library.dto.NearLibraryDto;
import com.rejs.nearlib.domain.library.service.LibraryService;
import com.rejs.nearlib.global.dto.ListDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/library")
public class LibraryController {
    private final LibraryService libraryService;

    @GetMapping("/{id}")
    public LibraryDto getLibraryId(@PathVariable("id") Long id){
        return libraryService.findById(id);
    }

    @GetMapping("/near")
    public ListDto<NearLibraryDto> getNearLibrary(@RequestParam("lat") Double latitude, @RequestParam("lng") Double longitude, @RequestParam("range") Integer range){
        return ListDto.of(libraryService.findNearLibraries(latitude, longitude, range));
    }

}
