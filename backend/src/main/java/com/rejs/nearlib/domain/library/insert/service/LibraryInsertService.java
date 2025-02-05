package com.rejs.nearlib.domain.library.insert.service;

import com.rejs.nearlib.domain.library.entity.Library;
import com.rejs.nearlib.domain.library.insert.dto.LibraryTuple;
import com.rejs.nearlib.domain.library.insert.repository.LibraryInsertRepository;
import com.rejs.nearlib.global.file.FileSystemAccessObject;
import com.univocity.parsers.csv.CsvParser;
import com.univocity.parsers.csv.CsvParserSettings;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Transactional
@Service
public class LibraryInsertService {
    private final LibraryInsertRepository libraryInsertRepository;
    private final FileSystemAccessObject fileSAO;

    public CsvParser getCsvParser(){
        CsvParserSettings settings = new CsvParserSettings();
        settings.setHeaderExtractionEnabled(true);
        return new CsvParser(settings);
    }

    public Integer insertLibraryData(){
        log.info("work-start");
        Resource libraryRowData = fileSAO.load("library.csv");
        CsvParser parser = getCsvParser();
        List<LibraryTuple> tuples = new ArrayList<>();
        log.info("parser-start");
        try(BufferedReader reader = new BufferedReader(new InputStreamReader(libraryRowData.getInputStream()))){
            for(String[] row : parser.iterate(reader)){
                try {
                    tuples.add(LibraryTuple.from(row));
                }catch (RuntimeException e){
                    continue;
                }
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        log.info("parser-end");
        libraryInsertRepository.batchInsert(tuples);
        return tuples.size();
    }

}
