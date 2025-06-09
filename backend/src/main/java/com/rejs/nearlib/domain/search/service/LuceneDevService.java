package com.rejs.nearlib.domain.search.service;

import org.apache.lucene.index.DirectoryReader;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

/**
 * LocalFile-System에 lucene을 사용하는 것을 전제로 함
 */
@Service
public class LuceneDevService {

    private String path = "files/indexes";

    public List<String> getIndexes(){
        List<String> indexes = new ArrayList<>();
        File directory = new File(path);
        if(directory.exists() && directory.isDirectory()){
            File[] files = directory.listFiles();
            if(files != null){
                for(File file : files){
                    if(file.isDirectory()){ // 하위 디렉토리
                        indexes.add(file.getName());
                    }
                }
            }
        }
        return indexes;
    }
}
