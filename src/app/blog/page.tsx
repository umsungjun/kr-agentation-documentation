'use client';

import Link from 'next/link';
import { Footer } from '../Footer';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  image: string;
}

const posts: BlogPost[] = [
  {
    slug: 'layout-mode',
    title: '레이아웃 모드 소개',
    description:
      '에이전트에게 배치를 보여주세요. 레이아웃을 텍스트로 설명하는 대신 컴포넌트를 드래그하고, 섹션을 재배치하고, 페이지를 와이어프레임으로 작성하세요.',
    date: '2026년 3월 24일',
    image: '/blog/layout-mode.png',
  },
  {
    slug: 'introducing-agentation-2',
    title: 'Agentation 2.0 소개',
    description:
      '주석이 양방향 대화가 됩니다. 이제 AI 에이전트가 실시간으로 피드백을 보고, 응답하고, 해결할 수 있습니다.',
    date: '2026년 2월 5일',
    image: '/blog/agentation-2.png',
  },
];

export default function BlogPage() {
  return (
    <>
      <article className="article">
        <header>
          <h1>블로그</h1>
          <p className="tagline">공지사항 및 업데이트</p>
        </header>

        <section>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              marginTop: '0.5rem',
            }}
          >
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="blog-post-card"
              >
                <div
                  style={{
                    aspectRatio: '3600 / 1890',
                    background:
                      'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
                <div
                  style={{
                    padding: '1rem 1.25rem',
                    background: 'rgba(0, 0, 0, 0.02)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginTop: '0.25rem',
                      marginBottom: '0.375rem',
                    }}
                  >
                    <h3
                      style={{
                        fontSize: '0.9375rem',
                        fontWeight: 550,
                        color: 'rgba(0, 0, 0, 0.85)',
                        margin: 0,
                      }}
                    >
                      {post.title}
                    </h3>
                    <span style={{ color: 'rgba(0, 0, 0, 0.25)' }}>•</span>
                    <time
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 450,
                        color: 'rgba(0, 0, 0, 0.4)',
                      }}
                    >
                      {post.date}
                    </time>
                  </div>
                  <p
                    style={{
                      fontSize: '0.8125rem',
                      color: 'rgba(0, 0, 0, 0.55)',
                      lineHeight: 1.45,
                      margin: 0,
                    }}
                  >
                    {post.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </article>

      <Footer />
    </>
  );
}
