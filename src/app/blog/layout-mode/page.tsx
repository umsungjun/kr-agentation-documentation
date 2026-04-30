'use client';

import Link from 'next/link';
import { Footer } from '../../Footer';

export default function LayoutModePage() {
  return (
    <>
      <article className="article">
        <header>
          <p
            style={{
              fontSize: '0.6875rem',
              fontWeight: 450,
              color: 'rgba(0, 0, 0, 0.4)',
              margin: '0 0 0.5rem 0',
            }}
          >
            2026년 3월 24일
          </p>
          <h1>레이아웃 모드 소개</h1>
          <p className="tagline">탐색, 와이어프레임, 재배치</p>
        </header>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            marginBottom: '0.75rem',
          }}
        >
          <p style={{ margin: 0 }}>
            어노테이션은 무언가를 가리키며 무엇이 잘못됐는지 말하는 데
            유용합니다. 하지만 때로는 무엇이 잘못됐는지조차 모를 때가 있습니다.
            페이지가 어떻게 보여야 하는지 아직 파악 중인 거죠.
          </p>

          <p style={{ margin: 0 }}>
            레이아웃 모드는 설명하는 대신 직접 보여줄 수 있게 해줍니다.{' '}
            <code>L</code> 키를 누르고, 컴포넌트를 페이지에 드래그하거나, 섹션을
            재배치하거나, 빈 화면에서 새 페이지를 와이어프레임으로 작성하세요.
            에이전트는 긴 설명 대신 좌표와 크기 정보를 받습니다.
          </p>
        </div>

        <section>
          <h2 id="exploration">작동 방식</h2>
          <p>
            &ldquo;추천사 섹션이 가격표 위에 있으면 어떨까?&rdquo; &ldquo;여기에
            사이드바를 넣고 싶은데, 이 정도 너비로.&rdquo; &ldquo;대략 이런
            모양의 대시보드를 만들어줘.&rdquo; 이런 내용은 텍스트로 설명하기
            어렵습니다. 그러니 직접 스케치하세요.
          </p>
          <p>
            <code>L</code> 키를 누르면 툴바가 레이아웃 모드로 전환됩니다. 원하는
            위치에 컴포넌트를 배치하고, 기존 섹션을 드래그해 재배치하거나,
            페이지를 초기화하고 새로운 레이아웃을 와이어프레임으로 작성할 수
            있습니다. 모든 작업은 위치, 크기, 레이블이 포함된 구조화된 출력으로
            변환됩니다.
          </p>
        </section>

        <section>
          <h2 id="wireframe">와이어프레이밍</h2>
          <p>
            &ldquo;새 페이지 와이어프레임&rdquo;을 토글하면 현재 페이지가 페이드
            아웃됩니다. 작업하면서 기존 내용을 참고하고 싶다면 불투명도
            슬라이더를 조절하세요.
          </p>
          <p>
            상단의 목적 필드에 컨텍스트를 입력할 수 있습니다: &ldquo;가격표와
            추천사가 있는 랜딩 페이지&rdquo; 또는 &ldquo;탭이 있는 설정
            페이지.&rdquo; 이 내용은 에이전트가 박스들이 무엇을 위한 것인지 알
            수 있도록 출력에 포함됩니다.
          </p>
          <p>
            와이어프레임 배치와 재배치 변경사항은 별도로 상태가 유지됩니다. 어느
            한쪽의 작업을 잃지 않고 와이어프레임을 켜고 끌 수 있습니다.
          </p>
        </section>

        <section>
          <h2 id="rearrange">재배치</h2>
          <p>
            레이아웃 모드에서는 페이지의 모든 섹션을 드래그할 수 있습니다. 섹션
            위에 마우스를 올리면 CSS 선택자 레이블과 함께 외곽선이 표시됩니다.
            드래그해서 순서를 바꾸세요. 같은 세션에서 섹션 재배치와 새 컴포넌트
            배치를 함께 할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 id="components">컴포넌트 팔레트</h2>
          <p>
            팔레트에는 Layout, Content, Controls, Elements, Blocks의 다섯
            카테고리에 걸쳐 65개 이상의 컴포넌트 유형이 있습니다. 유형을
            선택하고, 페이지에 드래그한 뒤, 크기를 조절하세요. 각 배치에는
            컴포넌트 유형, 픽셀 크기, 페이지 내 위치가 기록됩니다.
          </p>
        </section>

        <section>
          <h2 id="schema">내부 구조</h2>
          <p>
            레이아웃 모드는 <Link href="/schema">Annotation Format Schema</Link>
            를 AFS 1.1로 확장합니다. 어노테이션에는 이제 <code>kind</code>{' '}
            필드가 추가됩니다: <code>feedback</code>, <code>placement</code>,
            또는 <code>rearrange</code>. 각 kind에는 에이전트가 처리 방법을 알
            수 있도록 고유한 구조화된 데이터가 있습니다.
          </p>
          <p>
            <Link href="/mcp">MCP 서버</Link>가 실행 중이라면, 에이전트는
            레이아웃 변경사항을 실시간으로 확인할 수 있습니다.
          </p>
        </section>

        <p>
          레이아웃 모드는 Agentation의 역할을 피드백을 넘어 기획,
          와이어프레이밍, 실시간 아이디어 탐색으로 확장합니다.{' '}
          <Link href="/changelog">v3.0</Link>에 포함되어 출시됩니다. 유용하게
          사용하시길 바랍니다.
        </p>
      </article>

      <Footer />
    </>
  );
}
