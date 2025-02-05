package com.rejs.nearlib.domain.library.insert.controller;

import com.rejs.nearlib.domain.library.insert.service.LibraryInsertService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/admin/library/insert")
public class LibraryInsertController {
    private final LibraryInsertService libraryInsertService;

    @GetMapping
    public ResponseEntity<String> batchInsert(){
        try{
            Integer size = libraryInsertService.insertLibraryData();
            return ResponseEntity.ok().body(Map.of("size", size).toString());
        }catch (RuntimeException e){
            log.warn("exception : ", e);
            return ResponseEntity.internalServerError().body(Map.of("fail", e).toString());
        }
    }
}
