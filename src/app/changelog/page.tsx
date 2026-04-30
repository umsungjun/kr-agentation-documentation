'use client';

import { Footer } from '../Footer';
import { ReactNode } from 'react';

type ChangeType = 'added' | 'fixed' | 'improved' | 'removed';

interface Change {
  type: ChangeType;
  text: ReactNode;
}

interface Release {
  version: string;
  date: string;
  summary?: ReactNode;
  changes?: Change[];
}

const badgeLabels: Record<ChangeType, string> = {
  added: '추가',
  fixed: '수정',
  improved: '개선',
  removed: '제거',
};

function isMajorVersion(version: string): boolean {
  return version.endsWith('.0.0');
}

const releases: Release[] = [
  {
    version: '3.0.2',
    date: '2026년 3월 24일',
    changes: [
      {
        type: 'fixed',
        text: '툴바가 페이지 애니메이션을 일시정지할 때 레이아웃 모드 애니메이션이 멈추는 문제 수정',
      },
      {
        type: 'fixed',
        text: '어노테이션 텍스트 영역, 설정 패널, 색상 견본이 컨테이너를 벗어나는 오버플로우 문제 수정',
      },
    ],
  },
  {
    version: '3.0.1',
    date: '2026년 3월 24일',
    changes: [
      {
        type: 'fixed',
        text: 'npm 및 설정 패널의 로고 표시 오류 수정',
      },
    ],
  },
  {
    version: '3.0.0',
    date: '2026년 3월 24일',
    summary: (
      <>
        에이전트에게 배치 위치를 직접 보여주세요.{' '}
        <a href="/blog/layout-mode" className="styled-link">
          레이아웃 모드
        </a>
        를 통해 컴포넌트를 배치하고, 섹션을 재배치하며, 새 페이지를
        와이어프레임으로 작성할 수 있습니다. 에이전트는 긴 설명 대신 좌표와 크기
        정보를 받습니다.
      </>
    ),
    changes: [
      {
        type: 'added',
        text: (
          <>
            레이아웃 모드 — <code>L</code> 키를 눌러 컴포넌트를 페이지에
            드래그하거나, 기존 섹션을 재배치하거나, 빈 화면에서 와이어프레임
            작업 가능
          </>
        ),
      },
      {
        type: 'added',
        text: '5개 카테고리에 걸쳐 65개 이상의 드래그 가능한 유형을 포함한 컴포넌트 팔레트',
      },
      {
        type: 'added',
        text: '스냅 가이드, 이동 배지, CSS 선택자 레이블을 지원하는 섹션 감지 및 재배치 기능',
      },
      {
        type: 'added',
        text: '현재 페이지 불투명도 조절과 컨텍스트를 위한 목적 필드를 포함한 새 페이지 와이어프레임 모드',
      },
      {
        type: 'added',
        text: (
          <>
            <a href="/schema" className="styled-link">
              AFS 1.1
            </a>{' '}
            — 에이전트가 피드백, 배치, 재배치 지시를 구분할 수 있도록
            어노테이션에 <code>kind</code> 필드 추가
          </>
        ),
      },
      {
        type: 'improved',
        text: '커서 스타일이 툴바 루트 내에 격리되어 호스트 페이지에 영향을 주지 않도록 개선',
      },
    ],
  },
  {
    version: '2.3.3',
    date: '2026년 3월 14일',
    changes: [
      {
        type: 'improved',
        text: '마커 색상이 와이드 색역 화면에서 Display P3를 사용하고, sRGB로 폴백하도록 개선',
      },
      {
        type: 'fixed',
        text: (
          <>
            <code>className</code> prop이 <code>!important</code> 없이 툴바
            위치를 덮어쓸 수 있도록 수정
          </>
        ),
      },
    ],
  },
  {
    version: '2.3.2',
    date: '2026년 3월 9일',
    changes: [
      {
        type: 'fixed',
        text: '범위 없는 fill 보호 규칙(예: Tailwind의 fill-current)으로 인해 호스트 페이지 SVG 아이콘이 깨지는 문제 수정',
      },
      {
        type: 'fixed',
        text: '호스트 CSS가 인라인 opacity를 덮어쓸 때 툴바 아이콘 상태가 동시에 렌더링되는 문제 수정',
      },
      {
        type: 'fixed',
        text: '모달 및 드로어(Radix, shadcn, vaul) 내부의 입력 요소에 어노테이션할 때 텍스트 영역 포커스가 사라지는 문제 수정',
      },
      {
        type: 'fixed',
        text: 'Next.js App Router 내부(SegmentViewNode)가 실제 React 컴포넌트 이름 대신 표시되는 문제 수정',
      },
    ],
  },
  {
    version: '2.3.1',
    date: '2026년 3월 9일',
    changes: [
      {
        type: 'fixed',
        text: '어노테이션 텍스트 영역 및 설정 입력란에 타이핑할 때 호스트 앱의 키보드 단축키가 실행되는 문제 수정',
      },
    ],
  },
  {
    version: '2.3.0',
    date: '2026년 3월 7일',
    changes: [
      {
        type: 'added',
        text: (
          <>
            소스 파일 감지 — 어노테이션에 소스 파일 경로와 줄 번호(예:{' '}
            <code>src/components/Button.tsx:42</code>) 포함, Next.js, Vite,
            Webpack, Turbopack 지원
          </>
        ),
      },
      {
        type: 'added',
        text: (
          <>
            툴바 위치 커스터마이징을 위한 <code>className</code> prop 추가
          </>
        ),
      },
      {
        type: 'added',
        text: '탭 단위로 툴바를 숨기는 "재시작 시까지 숨기기" 설정 추가',
      },
      {
        type: 'improved',
        text: '툴바 CSS가 호스트 페이지 스타일로부터 완전히 격리되도록 개선',
      },
      {
        type: 'improved',
        text: '툴바 버튼 사이를 이동할 때 툴팁이 즉시 표시되도록 개선',
      },
      {
        type: 'improved',
        text: (
          <>
            더 나은 트리 쉐이킹을 위한 <code>sideEffects: false</code> 추가
          </>
        ),
      },
      {
        type: 'fixed',
        text: '비표준 환경에서 개발 모드 감지 오류 수정',
      },
      {
        type: 'fixed',
        text: '전송 버튼 포인터 이벤트가 등록되지 않는 문제 수정',
      },
      {
        type: 'fixed',
        text: '툴바 포털 이벤트가 호스트 앱의 클릭 외부 핸들러를 트리거하는 문제 수정',
      },
      {
        type: 'fixed',
        text: '동기화 이후 해결 및 닫힌 어노테이션이 다시 나타나는 문제 수정',
      },
    ],
  },
  {
    version: '2.2.1',
    date: '2026년 2월 11일',
    changes: [
      {
        type: 'fixed',
        text: '툴바 버튼이 가끔 클릭 및 드래그에 응답하지 않는 문제 수정',
      },
    ],
  },
  {
    version: '2.2.0',
    date: '2026년 2월 6일',
    changes: [
      {
        type: 'improved',
        text: '애니메이션 일시정지 기능이 CSS, JavaScript 타이머, requestAnimationFrame, Web Animations API, 동영상을 포함한 모든 페이지 애니메이션을 멈추고 정확히 멈춘 지점에서 재개하도록 개선',
      },
    ],
  },
  {
    version: '2.1.1',
    date: '2026년 2월 5일',
    changes: [
      {
        type: 'fixed',
        text: "엔드포인트가 설정되지 않은 경우 MCP 연결 설정의 '자세히 알아보기' 링크에 스타일이 적용되지 않는 문제 수정",
      },
    ],
  },
  {
    version: '2.1.0',
    date: '2026년 2월 5일',
    changes: [
      {
        type: 'added',
        text: (
          <>
            <a href="/mcp#hands-free-mode" className="styled-link">
              핸즈프리 모드(Hands-free mode)
            </a>{' '}
            — <code>watch_annotations</code> 도구가 새 주석이 나타날 때까지
            대기하다가 에이전트가 루프에서 처리할 배치를 반환
          </>
        ),
      },
      {
        type: 'added',
        text: (
          <>
            피드백 모드 토글을 위한 키보드 단축키 <code>Cmd+Shift+F</code> /{' '}
            <code>Ctrl+Shift+F</code>
          </>
        ),
      },
      {
        type: 'added',
        text: '해결된 주석이 Server-Sent Events를 통해 브라우저 UI에서 실시간으로 사라지는 애니메이션 추가',
      },
      {
        type: 'fixed',
        text: '프로덕션 빌드에서 매 페이지 로드마다 localhost:4747을 헬스체크하지 않도록 수정',
      },
      {
        type: 'fixed',
        text: 'SSE 연결이 끊어질 경우 MCP 도구가 무한 대기하는 문제 수정',
      },
      {
        type: 'removed',
        text: (
          <>
            <code>wait_for_action</code> MCP 도구 제거 — 미사용 상태로{' '}
            <code>watch_annotations</code>로 대체됨
          </>
        ),
      },
    ],
  },
  {
    version: '2.0.0',
    date: '2026년 2월 5일',
    summary:
      '"주석 달고, 복사하고, 붙여넣기"에서 "주석 달고 협업하기"로의 전환. 에이전트가 이제 주석을 직접 볼 수 있습니다. 이번 업데이트에는 MCP 서버 통합, 웹훅, React 컴포넌트 감지, Shadow DOM 지원 등 많은 기능이 추가되었습니다.',
    changes: [
      {
        type: 'added',
        text: (
          <>
            <a href="/mcp" className="styled-link">
              MCP 서버
            </a>{' '}
            직접 에이전트 연동 추가 — 에이전트가 주석을 가져오고, 확인하고,
            해결하고, 기각할 수 있음
          </>
        ),
      },
      {
        type: 'added',
        text: 'HTTP API 및 실시간 업데이트를 위한 Server-Sent Events 추가',
      },
      {
        type: 'added',
        text: (
          <>
            풍부한 주석 메타데이터(타임스탬프, 상태, 해결자 정보)를 포함한
            페이지별{' '}
            <a href="/mcp#sessions" className="styled-link">
              세션
            </a>
          </>
        ),
      },
      {
        type: 'added',
        text: '상태 전환: 대기 중 → 확인됨 → 해결됨/기각됨, 모두 타임스탬프 기록',
      },
      {
        type: 'added',
        text: (
          <>
            우선순위 지정을 위한 의도 및 심각도 필드를 포함한{' '}
            <a href="/schema" className="styled-link">
              주석 형식 스키마(Annotation Format Schema)
            </a>
          </>
        ),
      },
      {
        type: 'added',
        text: '주석 형식을 위한 JSON Schema 및 TypeScript 정의 추가',
      },
      {
        type: 'added',
        text: (
          <>
            구조화된 JSON 페이로드를 포함한 주석 이벤트 구독을 위한{' '}
            <a href="/webhooks" className="styled-link">
              웹훅(Webhooks)
            </a>
          </>
        ),
      },
      {
        type: 'added',
        text: (
          <>
            <a href="/features#react-detection" className="styled-link">
              React 컴포넌트 감지
            </a>{' '}
            — 호버 시 DOM 요소뿐만 아니라 전체 컴포넌트 계층 구조 표시
          </>
        ),
      },
      {
        type: 'added',
        text: (
          <>
            Shadow DOM 지원 — 모달, 웹 컴포넌트, Shadow DOM을 사용하는 디자인
            시스템의 요소에 주석 추가 가능
          </>
        ),
      },
      {
        type: 'added',
        text: '툴바 위치가 localStorage에 저장 — 한 번 드래그하면 그 위치에 유지됨',
      },
      {
        type: 'added',
        text: (
          <>
            Cmd+Shift+클릭 다중 요소 선택 — <code>⌘</code>+<code>⇧</code>를 누른
            채 요소를 클릭하여 개별적으로 선택하고, 놓으면 그룹에 주석 추가
          </>
        ),
      },
      {
        type: 'improved',
        text: '컴포넌트 감지가 출력 상세 수준에 따라 조정됨 (Compact, Standard, Detailed, Forensic)',
      },
      {
        type: 'improved',
        text: '설정 패널의 커서 스타일 개선 — 텍스트 입력에는 I-빔, 클릭 가능한 항목에는 포인터',
      },
      {
        type: 'improved',
        text: '호버 시 개별 요소 하이라이트 — cmd+shift 다중 선택 주석이 결합된 박스 대신 각 요소를 별도로 표시',
      },
      {
        type: 'fixed',
        text: '고정/스티키 요소 위치 수정 — 고정 내비게이션과 스티키 헤더의 주석이 스크롤 위치에 관계없이 올바르게 위치함',
      },
      {
        type: 'improved',
        text: '"페이지 상호작용 차단"이 기본적으로 활성화됨 — 주석 추가 중 실수로 클릭하는 것을 방지 (설정에서 비활성화 가능)',
      },
      {
        type: 'fixed',
        text: '호스트 페이지 fill 스타일로 깨지던 SVG 아이콘 수정 — 충돌을 피하기 위해 속성 선택자 사용',
      },
      {
        type: 'fixed',
        text: '복사된 피드백 URL에 쿼리 파라미터와 해시 프래그먼트가 보존되도록 수정',
      },
    ],
  },
  {
    version: '1.3.2',
    date: '2026년 1월 24일',
    changes: [
      {
        type: 'fixed',
        text: '마커 호버 시 툴팁 텍스트가 흐릿하게 보이는 문제 수정 (부모 트랜스폼을 상쇄하기 위해 역 스케일 적용)',
      },
      {
        type: 'improved',
        text: '마커 툴팁과 주석 팝업 간의 인용 텍스트 스타일 통일',
      },
      { type: 'improved', text: '툴팁 폰트 및 패딩 일관성 개선' },
    ],
  },
  {
    version: '1.3.1',
    date: '2026년 1월 23일',
    changes: [
      { type: 'added', text: '툴바 버튼에 화살표가 있는 커스텀 툴팁 추가' },
      {
        type: 'added',
        text: '가시성 향상을 위해 마커 점 주위에 미묘한 테두리 추가',
      },
      { type: 'improved', text: '도움말 아이콘 디자인 및 툴팁 스타일링 개선' },
    ],
  },
  {
    version: '1.3.0',
    date: '2026년 1월 23일',
    changes: [
      {
        type: 'added',
        text: '주석 팝업에 접을 수 있는 계산된 스타일 섹션 추가 — 쉐브론을 클릭하면 선택한 요소의 CSS 속성 확인 가능',
      },
      { type: 'improved', text: '툴바 다듬기 및 시각적 개선' },
    ],
  },
  {
    version: '1.2.0',
    date: '2026년 1월 22일',
    changes: [
      {
        type: 'added',
        text: (
          <>
            <a href="/api" className="styled-link">
              프로그래매틱 API
            </a>
            : <code>onAnnotationAdd</code>, <code>onAnnotationDelete</code>,{' '}
            <code>onAnnotationUpdate</code>, <code>onAnnotationsClear</code>,{' '}
            <code>onCopy</code> 콜백 추가
          </>
        ),
      },
      {
        type: 'added',
        text: (
          <>
            클립보드 동작을 제어하는 <code>copyToClipboard</code> prop 추가
          </>
        ),
      },
    ],
  },
  {
    version: '1.1.1',
    date: '2026년 1월 22일',
    changes: [
      {
        type: 'added',
        text: '자동 설정을 위한 Claude Code 스킬 추가 (npx skills add benjitaylor/agentation)',
      },
      { type: 'fixed', text: '색상 선택기에서 React key prop 경고 수정' },
    ],
  },
  {
    version: '1.1.0',
    date: '2026년 1월 21일',
    changes: [
      {
        type: 'improved',
        text: '패키지 exports에 올바른 TypeScript 타입 조건 추가',
      },
      {
        type: 'removed',
        text: '더 이상 사용되지 않는 AgentationCSS export 별칭 제거 (대신 Agentation 사용)',
      },
    ],
  },
  {
    version: '1.0.0',
    date: '2026년 1월 21일',
    summary:
      '첫 번째 안정 버전 출시. 요소를 클릭하여 주석 추가, 텍스트 선택, 드래그로 다중 선택. 다양한 출력 상세 수준, 키보드 단축키, 커스텀 마커 색상, localStorage 저장 기능 포함.',
  },
];

export default function ChangelogPage() {
  return (
    <>
      <article className="article">
        <header>
          <h1>변경 이력</h1>
          <p className="tagline">릴리즈 히스토리</p>
        </header>

        {releases.map((release, i) => (
          <section key={release.version}>
            <h2
              style={
                isMajorVersion(release.version)
                  ? { fontSize: '1.125rem' }
                  : undefined
              }
            >
              <a
                href={`https://www.npmjs.com/package/agentation/v/${release.version}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                {isMajorVersion(release.version) ? (
                  <span
                    className="sketchy-underline"
                    style={
                      { '--marker-color': '#febc2e' } as React.CSSProperties
                    }
                  >
                    {release.version}
                  </span>
                ) : (
                  release.version
                )}
              </a>
              <span
                style={{
                  fontWeight: 400,
                  color: 'rgba(0, 0, 0, 0.35)',
                  marginLeft: '0',
                  ...(isMajorVersion(release.version) && {
                    fontSize: '0.8125rem',
                  }),
                }}
              >
                {release.date}
              </span>
            </h2>

            {release.summary && <p>{release.summary}</p>}

            {release.changes && release.changes.length > 0 && (
              <div
                style={{
                  marginTop: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                {(
                  ['added', 'improved', 'fixed', 'removed'] as ChangeType[]
                ).map((type) => {
                  const items = release.changes!.filter((c) => c.type === type);
                  if (items.length === 0) return null;
                  return (
                    <div key={type}>
                      <div
                        style={{
                          fontSize: '0.6875rem',
                          fontWeight: 500,
                          color: 'rgba(0, 0, 0, 0.4)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                          marginBottom: '0.5rem',
                        }}
                      >
                        {badgeLabels[type]}
                      </div>
                      <ul>
                        {items.map((change, j) => (
                          <li key={j}>{change.text}</li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        ))}
      </article>

      <Footer />
    </>
  );
}
