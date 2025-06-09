package com.rejs.nearlib.domain.search.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class IndexInfo {
    private String name;
    private List<String> fieldNames;
    private int numDocs;
    private int macDoc;
    private int numDeletedDocs;

    public IndexInfo(String name, int numDocs, int macDoc, int numDeletedDocs, List<String> fieldNames) {
        this.name = name;
        this.fieldNames = fieldNames;
        this.numDocs = numDocs;
        this.macDoc = macDoc;
        this.numDeletedDocs = numDeletedDocs;
    }
}
