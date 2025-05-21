package com.rejs.nearlib.global.hibernate.search.analysis;

import org.apache.lucene.analysis.core.LowerCaseFilterFactory;
import org.apache.lucene.analysis.core.WhitespaceTokenizerFactory;
import org.apache.lucene.analysis.ko.KoreanTokenizerFactory;
import org.apache.lucene.analysis.miscellaneous.RemoveDuplicatesTokenFilterFactory;
import org.apache.lucene.analysis.ngram.EdgeNGramFilterFactory;
import org.apache.lucene.analysis.ngram.NGramFilterFactory;
import org.hibernate.search.backend.lucene.analysis.LuceneAnalysisConfigurationContext;
import org.hibernate.search.backend.lucene.analysis.LuceneAnalysisConfigurer;

public class NgramLuceneAnalysisConfigurerImpl implements LuceneAnalysisConfigurer {
    @Override
    public void configure(LuceneAnalysisConfigurationContext context) {
        // 검색용
        context.analyzer("nori-korean").custom()
                .tokenizer(KoreanTokenizerFactory.class)               // Nori 토크나이저
                .tokenFilter(NGramFilterFactory.class)                 // N-gram 토큰화
                .param("minGramSize", "2")
                .param("maxGramSize", "3");

    }
}
