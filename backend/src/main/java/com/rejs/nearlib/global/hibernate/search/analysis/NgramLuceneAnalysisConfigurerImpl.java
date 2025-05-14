package com.rejs.nearlib.global.hibernate.search.analysis;

import org.apache.lucene.analysis.core.LowerCaseFilterFactory;
import org.apache.lucene.analysis.core.WhitespaceTokenizerFactory;
import org.apache.lucene.analysis.ngram.NGramFilterFactory;
import org.hibernate.search.backend.lucene.analysis.LuceneAnalysisConfigurationContext;
import org.hibernate.search.backend.lucene.analysis.LuceneAnalysisConfigurer;

public class NgramLuceneAnalysisConfigurerImpl implements LuceneAnalysisConfigurer {
    @Override
    public void configure(LuceneAnalysisConfigurationContext context) {
        context.analyzer("ngram-korean").custom()
                .tokenizer(WhitespaceTokenizerFactory.class)
                .tokenFilter(LowerCaseFilterFactory.class)
                .tokenFilter(NGramFilterFactory.class)
                .param("minGramSize", "2")
                .param("maxGramSize", "3");
    }
}
