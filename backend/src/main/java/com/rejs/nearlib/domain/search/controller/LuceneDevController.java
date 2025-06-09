package com.rejs.nearlib.domain.search.controller;

import com.rejs.nearlib.domain.library.service.LibraryTokenizeService;
import com.rejs.nearlib.domain.search.dto.IndexInfo;
import com.rejs.nearlib.domain.search.service.LuceneDevService;
import com.rejs.nearlib.global.dto.ListDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/dev-lucene")
public class LuceneDevController {
    private final LuceneDevService luceneDevService;
    private final LibraryTokenizeService libraryTokenizeService;

    @GetMapping("/indexes")
    public List<String> getIndexes(){
        return luceneDevService.getIndexes();
    }

    @GetMapping("/indexes/{indexName}/metadata")
    public IndexInfo getIndexMetadata(@PathVariable("indexName") String indexName){
        return luceneDevService.getIndexMetaData(indexName);
    }

    @GetMapping("/indexes/{indexName}/values")
    public List<Map<String, Object>> getIndexValues(@PathVariable("indexName") String indexName){
        return luceneDevService.getIndexValues(indexName);
    }

    @GetMapping("/library/token")
    public ListDto<String> getToken(@RequestParam(name = "q") String query){
        return ListDto.of(libraryTokenizeService.getTokens(query));
    }

}
