---
title: Building a RAG Pipeline That Holds Up in Production
date: jan 15, 2026
excerpt: Naive RAG demos great and fails in prod. Here is what actually moves the needle: chunking, reranking, and honest evaluation.
tags: RAG, LLM, NLP
cover: https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80
---

Most RAG demos look magical and collapse the moment real users show up. The
gap is rarely the model. It's everything around it.

## 1. Chunking is the whole game

Bad chunks poison retrieval. A few rules that survived contact with reality:

- Split on **semantic boundaries**, not fixed token counts.
- Keep chunks **small enough to be precise**, big enough to stand alone.
- Store page and section metadata so you can cite sources.

```python
splitter = RecursiveCharacterTextSplitter(
    chunk_size=800,
    chunk_overlap=120,
    separators=["\n\n", "\n", ". "],
)
```

## 2. Retrieve wide, then rerank

Vector search alone is noisy. Pull the top 20, then let a cross-encoder
reranker pick the real top 5. This single step fixed most of my "why did it
answer that?" bugs.

## 3. Evaluate like you mean it

If you can't measure it, you're guessing. Track:

1. **Retrieval hit-rate:** did the right chunk make the cut?
2. **Faithfulness:** is the answer grounded in the sources?
3. **Answer relevance:** did it actually answer the question?

> Ship the version that survives evaluation, not the one that demos well.

That's it. No magic, just discipline around the boring parts.
