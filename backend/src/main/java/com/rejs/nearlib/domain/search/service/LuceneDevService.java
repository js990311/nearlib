package com.rejs.nearlib.domain.search.service;

import com.rejs.nearlib.domain.search.dto.IndexInfo;
import org.apache.lucene.document.Document;
import org.apache.lucene.index.*;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.MatchAllDocsQuery;
import org.apache.lucene.search.ScoreDoc;
import org.apache.lucene.search.TopDocs;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    public IndexInfo getIndexMetaData(String indexName) throws IOException {
        IndexInfo indexInfo = null;
        Directory directory = null;
        DirectoryReader reader = null;
        try {
            directory = FSDirectory.open(Path.of(path + "/" + indexName));
            reader = DirectoryReader.open(directory);

            // 문서수 정보
            int numDocs = reader.numDocs(); // 문서수
            int maxDoc = reader.maxDoc(); // 삭제된 문서 포함
            int numDeletedDocs = reader.numDeletedDocs(); // 삭제된 문서수
            FieldInfos fieldInfos = FieldInfos.getMergedFieldInfos(reader);

            List<String> fieldNames = new ArrayList<>();
            for (FieldInfo fieldInfo : fieldInfos) {
                fieldNames.add(fieldInfo.name);
            }
            indexInfo = new IndexInfo(indexName,numDocs, maxDoc, numDeletedDocs, fieldNames);
        }finally {
            if(directory != null){
                directory.close();
            }
            if(reader != null){
                reader.close();
            }
        }
        return indexInfo;
    }

    public List<Map<String, Object>> getIndexValues(String indexName) throws IOException {
        List<Map<String, Object>> documentDatas = new ArrayList<>();

        Directory directory = null;
        DirectoryReader reader = null;
        try {
            directory = FSDirectory.open(Path.of(path + "/" + indexName));
            reader = DirectoryReader.open(directory);

            IndexSearcher searcher = new IndexSearcher(reader);
            TopDocs topHits = searcher.search(new MatchAllDocsQuery(), 20);

            for (ScoreDoc scoreDoc : topHits.scoreDocs) {
                int docId = scoreDoc.doc;
                Document document = reader.document(docId);

                Map<String, Object> fieldsData = new HashMap<>();

                // 7. 각 필드의 값 추출
                for (IndexableField field : document.getFields()) {
                    String fieldName = field.name();
                    Object fieldValue = null;

                    // 필드 타입에 따라 적절한 값 추출 메서드 사용
                    if (field.stringValue() != null) {
                        fieldValue = field.stringValue(); // 문자열 값
                    } else if (field.numericValue() != null) {
                        fieldValue = field.numericValue(); // 숫자 값 (Long, Integer, Double 등)
                    }
                    fieldsData.put(fieldName, fieldValue);
                }
                documentDatas.add(fieldsData);
            }
        }finally {
            if(directory != null){
                directory.close();
            }
            if(reader != null){
                reader.close();
            }
        }
        return documentDatas;
    }
}
