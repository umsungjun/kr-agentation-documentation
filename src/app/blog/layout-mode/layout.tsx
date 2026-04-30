import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '레이아웃 모드 소개',
  description:
    '에이전트에게 배치를 보여주세요 — 레이아웃을 텍스트로 설명하는 대신 컴포넌트를 드래그하고, 섹션을 재배치하고, 페이지를 와이어프레임으로 작성할 수 있습니다.',
  openGraph: {
    title: '레이아웃 모드 소개',
    description:
      '에이전트에게 배치를 보여주세요 — 레이아웃을 텍스트로 설명하는 대신 컴포넌트를 드래그하고, 섹션을 재배치하고, 페이지를 와이어프레임으로 작성할 수 있습니다.',
    images: [
      {
        url: '/blog/layout-mode.png',
        width: 1506,
        height: 916,
        alt: '레이아웃 모드 — 컴포넌트 배치, 섹션 재배치, 공간적으로 레이아웃 구성',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '레이아웃 모드 소개',
    description:
      '에이전트에게 배치를 보여주세요 — 레이아웃을 텍스트로 설명하는 대신 컴포넌트를 드래그하고, 섹션을 재배치하고, 페이지를 와이어프레임으로 작성할 수 있습니다.',
    images: ['/blog/layout-mode.png'],
  },
};

export default function LayoutModeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
