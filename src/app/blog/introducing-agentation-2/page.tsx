'use client';

import Link from 'next/link';
import { Footer } from '../../Footer';

export default function Agentation2Page() {
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
            2026년 2월 5일{' '}
            <span
              style={{ color: 'rgba(0, 0, 0, 0.15)', margin: '0 0.375rem' }}
            >
              |
            </span>{' '}
            Benji Taylor 작성
          </p>
          <h1>Agentation 2.0 소개</h1>
          <p className="tagline">인간과 AI가 UI에서 협업하는 새로운 방법</p>
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
            출시 이후, Agentation은 이미 많은 개발자들이 AI와 함께 UI 작업하는
            방식의 일부가 되었으며,{' '}
            <a
              href="https://github.com/benjitaylor/agentation"
              target="_blank"
              rel="noopener noreferrer"
            >
              1.8k GitHub 스타
            </a>
            와 npm을 통해{' '}
            <a
              href="https://www.npmjs.com/package/agentation"
              target="_blank"
              rel="noopener noreferrer"
            >
              수십만 번의 설치
            </a>
            를 기록했습니다.
          </p>

          <p style={{ margin: 0 }}>
            버전 1은 <em>주석 달고, 복사하고, 붙여넣기</em>였습니다. 무언가에
            주석을 달고, 구조화된 출력을 복사하여 에이전트에게 전달하는
            방식이었습니다. 좋은 컨텍스트를 제공하지만 수동 전달이 필요했습니다.
          </p>

          <p style={{ margin: 0 }}>
            버전 2는 <em>주석 달고 협업하기</em>입니다. 에이전트가 주석을 직접
            볼 수 있습니다. 전체 그림을 가집니다: 무엇을 가리키는지, 무슨 말을
            했는지, 전체 사이트에서 무엇이 대기 중인지. 수정될 때까지 함께
            작업합니다.
          </p>
        </div>

        <section>
          <h2 id="mcp">MCP 연동</h2>
          <p>
            <Link href="/mcp">Model Context Protocol 서버</Link>가 2.0의 가장 큰
            추가 기능입니다. 직접 연결을 가능하게 하는 것이 바로 이것입니다.
          </p>
          <p>
            MCP를 통해 에이전트는 현재 주석을 가져오고, 확인하고, 후속 질문을
            하고, 요약과 함께 이슈를 해결하거나, 이유와 함께 피드백을 기각할 수
            있습니다. 주석이 에이전트의 컨텍스트로 직접 전달됩니다.
          </p>
          <p>
            서버는 로컬에서 실행되며 여러 인터페이스를 지원합니다: 직접 에이전트
            연동을 위한 <Link href="/mcp">MCP 도구</Link>, 커스텀 워크플로우를
            위한 <Link href="/api">HTTP API</Link>, 실시간 업데이트를 위한{' '}
            <Link href="/api#real-time-events">Server-Sent Events</Link>. Claude
            Code 및 모든 MCP 호환 클라이언트와 함께 작동하도록 설계되었습니다.
          </p>
          <p>워크플로우가 어떻게 보이는지 예시입니다:</p>
          <div
            style={{
              marginTop: '0.75rem',
              fontSize: '0.8125rem',
              lineHeight: 1.7,
              background: 'rgba(0, 0, 0, 0.02)',
              padding: '1rem 1.25rem',
              borderRadius: '0.5rem',
            }}
          >
            <p style={{ margin: '0.375rem 0' }}>
              <span style={{ color: 'rgba(0,0,0,0.4)' }}>사용자:</span>{' '}
              &ldquo;어떤 주석이 있나요?&rdquo;
            </p>
            <p style={{ margin: '0.375rem 0' }}>
              <span style={{ color: '#4a9eff' }}>에이전트:</span> &ldquo;주석
              3개: /checkout의 버튼, /settings의 대비, /about의 오타.&rdquo;
            </p>
            <p style={{ margin: '0.375rem 0' }}>
              <span style={{ color: 'rgba(0,0,0,0.4)' }}>사용자:</span>{' '}
              &ldquo;버튼 고쳐줘&rdquo;
            </p>
            <p style={{ margin: '0.375rem 0' }}>
              <span style={{ color: '#4a9eff' }}>에이전트:</span> &ldquo;폼과
              왼쪽 정렬할까요, 가운데 정렬할까요?&rdquo;
            </p>
            <p style={{ margin: '0.375rem 0' }}>
              <span style={{ color: 'rgba(0,0,0,0.4)' }}>사용자:</span>{' '}
              &ldquo;가운데&rdquo;
            </p>
            <p style={{ margin: '0.375rem 0' }}>
              <span style={{ color: '#4a9eff' }}>에이전트:</span> &ldquo;완료.
              해결됨으로 표시했습니다.&rdquo;
            </p>
          </div>
        </section>

        <section>
          <h2 id="sessions">세션 &amp; 스마트 필터링</h2>
          <p>
            모든 페이지에는 이제 자체 <Link href="/mcp#sessions">세션</Link>이
            있으며, 모든 주석에는 풍부한 메타데이터가 포함됩니다: 생성 시점,
            마지막 업데이트 시점, 현재 상태, 해결한 사람. 이를 통해 피드백을
            다루는 완전히 새로운 방법이 열립니다.
          </p>
          <p>에이전트에게 이런 질문을 할 수 있습니다:</p>
          <ul
            style={{
              fontSize: '0.875rem',
              lineHeight: 1.7,
              marginTop: '0.5rem',
              paddingLeft: '1.25rem',
            }}
          >
            <li>&ldquo;가장 오래 기다린 피드백이 무엇인가요?&rdquo;</li>
            <li>&ldquo;차단 이슈만 보여줘&rdquo;</li>
            <li>
              &ldquo;해결되지 않은 주석이 있는 페이지는 어디인가요?&rdquo;
            </li>
            <li>
              &ldquo;질문으로 표시한 것과 수정 요청으로 표시한 것이
              무엇인가요?&rdquo;
            </li>
          </ul>
          <p style={{ marginTop: '0.75rem' }}>
            상태 전환도 일급 기능입니다. 에이전트가 피드백을 처리하기 시작하면
            진행 중임을 알 수 있도록 <em>확인됨</em>으로 표시할 수 있습니다.
            완료되면 요약과 함께 해결됩니다. 조치를 취하지 않기로 결정하면
            이유와 함께 기각됩니다. 모든 상태 변경에 타임스탬프가 기록되어 전체
            이력을 항상 알 수 있습니다.
          </p>
        </section>

        <section>
          <h2 id="schema">표준화된 스키마</h2>
          <p>
            주석이 어떻게 구조화되는지를 정확하게 정의하는 공식{' '}
            <Link href="/schema">
              주석 형식 스키마(Annotation Format Schema)
            </Link>
            를 공개했습니다. 이 스키마를 통해 주석은 도구 간에 이식 가능하고
            이를 사용하는 모든 것에 대해 예측 가능합니다.
          </p>
          <p>
            스키마에는{' '}
            <Link href="/schema#annotation-object">의도 및 심각도 필드</Link>가
            포함되어 있어 차단 버그와 사소한 제안을 구분하거나, &ldquo;이것을
            고쳐줘&rdquo;와 &ldquo;이것에 대해 질문이 있어&rdquo;를 구분할 수
            있습니다. 에이전트는 이러한 신호를 사용하여 작업의 우선순위를
            자동으로 지정할 수 있습니다.
          </p>
          <p>
            JSON Schema와 TypeScript 정의 모두 제공됩니다. 주석을 사용하는
            도구를 만든다면, 스키마가 시작점입니다.
          </p>
        </section>

        <section>
          <h2 id="webhooks">웹훅(Webhooks)</h2>
          <p>
            <Link href="/webhooks">웹훅</Link>을 사용하면 주석 이벤트를 구독하여
            어디로든 전송할 수 있습니다. URL을 설정하면 모든 주석이 구조화된
            JSON 페이로드로 전달됩니다.
          </p>
          <p>구축할 수 있는 워크플로우 예시:</p>
          <ul
            style={{
              fontSize: '0.875rem',
              lineHeight: 1.7,
              marginTop: '0.5rem',
              paddingLeft: '1.25rem',
            }}
          >
            <li>
              <strong>GitHub 이슈:</strong> 심각도별로 레이블이 지정된 주석으로
              자동으로 이슈를 생성. Claude Code를 트리거하여 수정하는 GitHub
              Action과 연동.
            </li>
            <li>
              <strong>Slack 알림:</strong> &ldquo;수정하기&rdquo; 버튼이 있는
              차단 이슈를 채널에 게시하여 에이전트를 호출.
            </li>
            <li>
              <strong>Linear 동기화:</strong> 컴포넌트 경로가 미리 채워진
              티켓으로 주석을 변환하여 엔지니어가 어디를 봐야 할지 정확히 알 수
              있게 함.
            </li>
            <li>
              <strong>리뷰 대시보드:</strong> 팀 전체의 피드백을 단일 뷰로
              집계하여 나이와 심각도별로 정렬.
            </li>
          </ul>
          <p style={{ marginTop: '0.75rem' }}>
            스키마는 충분히 안정적이어서 이를 기반으로 구축할 수 있습니다. POST
            요청을 받을 수 있다면 워크플로우에 Agentation을 연동할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 id="react-detection">React 컴포넌트 감지</h2>
          <p>
            React 앱에서 요소 위에 마우스를 올리면 Agentation이 이제 전체{' '}
            <Link href="/features#react-detection">컴포넌트 계층 구조</Link>를
            보여줍니다. DOM 요소뿐만 아니라 코드베이스의 실제 컴포넌트를
            표시합니다.
          </p>
          <p>
            이를 통해 AI 에이전트가 올바른 파일을 찾는 것이 훨씬 쉬워집니다.
            생성된 클래스 이름을 검색하는 대신, 실제로 사용하는 이름인{' '}
            <code>ProductCard</code>나 <code>CheckoutButton</code>을 검색할 수
            있습니다.
          </p>
          <p>
            감지는 출력 형식에 맞게 조정됩니다: Compact 모드에서는 비활성화,
            Standard에서는 프레임워크 필터링, Detailed에서는 CSS 상관,
            Forensic에서는 내부 요소를 포함한 모든 것을 표시합니다.
          </p>
        </section>

        <section>
          <h2 id="whats-next">다음 계획</h2>
          <p>
            Agentation은 아직 새롭습니다. 비전은 UI 피드백 루프를 몇 시간에서 몇
            초로 줄이는 세상입니다. 무언가를 가리키고, 무엇이 잘못됐는지 말하고,
            실시간으로 수정되는 것을 보는 것입니다.
          </p>
          <p>
            아직 Agentation을 사용해보지 않으셨다면,{' '}
            <Link href="/install">설치</Link>하고 AI 에이전트와 함께 작업하는
            방식이 어떻게 바뀌는지 확인해보세요. 이미 사용 중이라면 2.0으로
            업데이트하고 어떻게 생각하시는지 알려주세요.
          </p>
        </section>
      </article>

      <Footer />
    </>
  );
}
