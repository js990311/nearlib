package com.rejs.nearlib.domain.library.controller;

import com.rejs.nearlib.domain.library.dto.LibraryDto;
import com.rejs.nearlib.domain.library.dto.NearLibraryDto;
import com.rejs.nearlib.domain.library.service.LibraryService;
import com.rejs.nearlib.global.dto.ListDto;
import com.rejs.nearlib.global.dto.PageDto;
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

    @GetMapping("/all-libraries-id")
    public ListDto<Long> getAllLibrariesId(){
        return ListDto.of(libraryService.findAllId());
    }

    @GetMapping("/search-db")
    public PageDto<LibraryDto> getSearchLibraryByDB(
            @RequestParam(name = "q") String query,
            @RequestParam(name = "p", defaultValue = "1") int page,
            @RequestParam(name= "s", defaultValue = "20") int size
    ){
        return PageDto.of(libraryService.searchByDB(query, page-1, size));
    }

    @GetMapping("/search-engine")
    public PageDto<LibraryDto> getSearchLibraryByEngine(
            @RequestParam(name = "q") String query,
            @RequestParam(name = "p", defaultValue = "1") int page,
            @RequestParam(name= "s", defaultValue = "20") int size
    ){
        return PageDto.of(libraryService.searchByDB(query, page-1, size));
    }

}
