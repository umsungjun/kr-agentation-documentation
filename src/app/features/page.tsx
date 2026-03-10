'use client';

import { Footer } from '../Footer';
import {
  FeaturesDemo,
  SettingsDemo,
  SmartIdentificationDemo,
  MarkerKeyDemo,
  ComputedStylesDemo,
  ReactDetectionDemo,
  AgentChatDemo,
} from '../components/FeaturesDemo';

export default function FeaturesPage() {
  return (
    <>
      <article className="article">
        <header>
          <h1>기능</h1>
          <p className="tagline">Agentation이 할 수 있는 모든 것</p>
        </header>

        <section>
          <h2 id="annotation-modes">어노테이션(Annotation) 모드</h2>
          <p>아래 탭을 클릭하여 각 어노테이션 모드의 예시를 확인하세요:</p>
          <FeaturesDemo />
        </section>

        <section>
          <h2 id="toolbar-controls">툴바(Toolbar) 컨트롤</h2>
          <ul>
            <li>
              <svg
                style={{
                  display: 'inline-block',
                  verticalAlign: '-0.38em',
                  width: '1.5em',
                  height: '1.5em',
                  margin: '0 -0.1em 0 0',
                }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M8 6L8 18" />
                <path d="M16 18L16 6" />
              </svg>{' '}
              <strong>일시정지</strong>{' '}
              <span style={{ color: 'rgba(0,0,0,0.25)', margin: '0 0.25em' }}>
                •
              </span>{' '}
              특정 상태를 어노테이션하기 위해 모든 애니메이션 정지
            </li>
            <li>
              <svg
                style={{
                  display: 'inline-block',
                  verticalAlign: '-0.38em',
                  width: '1.5em',
                  height: '1.5em',
                  margin: '0 -0.1em 0 0',
                }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3.91752 12.7539C3.65127 12.2889 3.65127 11.7111 3.91752 11.2461C5.42678 8.59839 8.46097 6.25 12 6.25C15.539 6.25 18.5732 8.59839 20.0825 11.2461C20.3487 11.7111 20.3487 12.2889 20.0825 12.7539C18.5732 15.4016 15.539 17.75 12 17.75C8.46097 17.75 5.42678 15.4016 3.91752 12.7539Z" />
                <path d="M12 14.8261C13.5608 14.8261 14.8261 13.5608 14.8261 12C14.8261 10.4392 13.5608 9.17391 12 9.17391C10.4392 9.17391 9.17391 10.4392 9.17391 12C9.17391 13.5608 10.4392 14.8261 12 14.8261Z" />
              </svg>{' '}
              <strong>표시 여부</strong>{' '}
              <span style={{ color: 'rgba(0,0,0,0.25)', margin: '0 0.25em' }}>
                •
              </span>{' '}
              작업 중 어노테이션 마커(Marker) 표시/숨김 전환
            </li>
            <li>
              <svg
                style={{
                  display: 'inline-block',
                  verticalAlign: '-0.38em',
                  width: '1.5em',
                  height: '1.5em',
                  margin: '0 -0.1em 0 0',
                }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M4.75 11.25C4.75 10.4216 5.42157 9.75 6.25 9.75H12.75C13.5784 9.75 14.25 10.4216 14.25 11.25V17.75C14.25 18.5784 13.5784 19.25 12.75 19.25H6.25C5.42157 19.25 4.75 18.5784 4.75 17.75V11.25Z" />
                <path d="M17.25 14.25H17.75C18.5784 14.25 19.25 13.5784 19.25 12.75V6.25C19.25 5.42157 18.5784 4.75 17.75 4.75H11.25C10.4216 4.75 9.75 5.42157 9.75 6.25V6.75" />
              </svg>{' '}
              <strong>복사</strong>{' '}
              <span style={{ color: 'rgba(0,0,0,0.25)', margin: '0 0.25em' }}>
                •
              </span>{' '}
              AI 에이전트를 위한 구조화된 마크다운 가져오기
            </li>
            <li>
              <svg
                style={{
                  display: 'inline-block',
                  verticalAlign: '-0.38em',
                  width: '1.5em',
                  height: '1.5em',
                  margin: '0 -0.1em 0 0',
                }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 11.5L10.125 15.5" />
                <path d="M14 11.5L13.87 15.5" />
                <path d="M9 7.5V6.25C9 5.42157 9.67157 4.75 10.5 4.75H13.5C14.3284 4.75 15 5.42157 15 6.25V7.5" />
                <path d="M5.5 7.75H18.5" />
                <path d="M6.75 7.75L7.11691 16.189C7.16369 17.2649 7.18708 17.8028 7.41136 18.2118C7.60875 18.5717 7.91211 18.8621 8.28026 19.0437C8.69854 19.25 9.23699 19.25 10.3139 19.25H13.6861C14.763 19.25 15.3015 19.25 15.7197 19.0437C16.0879 18.8621 16.3912 18.5717 16.5886 18.2118C16.8129 17.8028 16.8363 17.2649 16.8831 16.189L17.25 7.75" />
              </svg>{' '}
              <strong>전체 삭제</strong>{' '}
              <span style={{ color: 'rgba(0,0,0,0.25)', margin: '0 0.25em' }}>
                •
              </span>{' '}
              모든 어노테이션 제거
            </li>
            <li>
              <svg
                style={{
                  display: 'inline-block',
                  verticalAlign: '-0.38em',
                  width: '1.5em',
                  height: '1.5em',
                  margin: '0 -0.1em 0 0',
                }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9.875 14.125L12.3506 19.6951C12.7184 20.5227 13.9091 20.4741 14.2083 19.6193L18.8139 6.46032C19.0907 5.6695 18.3305 4.90933 17.5397 5.18611L4.38072 9.79174C3.52589 10.0909 3.47731 11.2816 4.30494 11.6494L9.875 14.125ZM9.875 14.125L13.375 10.625" />
              </svg>{' '}
              <strong>어노테이션 전송</strong>
              <span
                style={{
                  fontSize: '0.65em',
                  fontWeight: 400,
                  position: 'relative',
                  top: '-0.4em',
                }}
              >
                *
              </span>{' '}
              <span style={{ color: 'rgba(0,0,0,0.25)', margin: '0 0.25em' }}>
                •
              </span>{' '}
              설정된 웹훅(webhook)으로 어노테이션 전송
            </li>
            <li>
              <svg
                style={{
                  display: 'inline-block',
                  verticalAlign: '-0.38em',
                  width: '1.5em',
                  height: '1.5em',
                  margin: '0 -0.1em 0 0',
                }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10.6504 5.81117C10.9939 4.39628 13.0061 4.39628 13.3496 5.81117C13.5715 6.72517 14.6187 7.15891 15.4219 6.66952C16.6652 5.91193 18.0881 7.33479 17.3305 8.57815C16.8411 9.38134 17.2748 10.4285 18.1888 10.6504C19.6037 10.9939 19.6037 13.0061 18.1888 13.3496C17.2748 13.5715 16.8411 14.6187 17.3305 15.4219C18.0881 16.6652 16.6652 18.0881 15.4219 17.3305C14.6187 16.8411 13.5715 17.2748 13.3496 18.1888C13.0061 19.6037 10.9939 19.6037 10.6504 18.1888C10.4285 17.2748 9.38135 16.8411 8.57815 17.3305C7.33479 18.0881 5.91193 16.6652 6.66952 15.4219C7.15891 14.6187 6.72517 13.5715 5.81117 13.3496C4.39628 13.0061 4.39628 10.9939 5.81117 10.6504C6.72517 10.4285 7.15891 9.38134 6.66952 8.57815C5.91193 7.33479 7.33479 5.91192 8.57815 6.66952C9.38135 7.15891 10.4285 6.72517 10.6504 5.81117Z" />
                <circle cx="12" cy="12" r="2.5" />
              </svg>{' '}
              <strong>설정</strong>{' '}
              <span style={{ color: 'rgba(0,0,0,0.25)', margin: '0 0.25em' }}>
                •
              </span>{' '}
              출력 상세도, 마커 색상 및 동작 설정
            </li>
          </ul>
          <p
            style={{
              fontSize: '0.875rem',
              color: 'rgba(0,0,0,0.5)',
              marginTop: '0.75rem',
            }}
          >
            툴바를 드래그하여 위치를 변경할 수 있습니다. 마커를 클릭하면
            삭제되고, 우클릭하면 편집할 수 있습니다.
          </p>
          <p
            style={{
              fontSize: '0.75rem',
              color: 'rgba(0,0,0,0.4)',
              marginTop: '0.5rem',
            }}
          >
            *웹훅이 활성화되고 자동 전송이 꺼진 경우에만 표시됩니다
          </p>
        </section>

        <section>
          <h2 id="marker-types">마커(Marker) 유형</h2>
          <p>어노테이션 모드에 따라 다른 마커 스타일이 사용됩니다.</p>
          <MarkerKeyDemo />
        </section>

        <section>
          <h2 id="smart-identification">스마트 식별</h2>
          <p>
            Agentation은 코드 검색에 유용한 방식으로 요소를 자동으로 식별합니다.
            이를 통해 에이전트가 코드베이스에서 정확한 요소를 <code>grep</code>
            으로 쉽게 찾을 수 있습니다.
          </p>
          <SmartIdentificationDemo />
        </section>

        <section>
          <h2 id="computed-styles">계산된 스타일(Computed Styles)</h2>
          <p>
            어노테이션 팝업에서 요소의 계산된 CSS 스타일을 직접 확인할 수
            있습니다. 접을 수 있는 섹션을 펼치면 색상, 폰트, 간격 같은 관련
            속성을 볼 수 있습니다.
          </p>
          <ComputedStylesDemo />
        </section>

        <section>
          <h2 id="react-detection">React 컴포넌트 감지</h2>
          <p>
            Agentation은 React 컴포넌트 계층구조를 자동으로 감지합니다. 요소
            위에 마우스를 올리면 전체 컴포넌트 트리가 표시되어, AI 에이전트가
            코드베이스에서 정확한 컴포넌트를 찾기 쉬워집니다.
          </p>
          <ReactDetectionDemo />
          <p style={{ marginTop: '1rem' }}>
            설정에서 React 감지를 켜거나 끌 수 있습니다. 감지 모드는 출력 형식에
            따라 자동으로 조정됩니다:
          </p>
          <ul>
            <li>
              <strong>Compact</strong> &mdash; React 데이터 없음 (출력 최소화)
            </li>
            <li>
              <strong>Standard</strong> &mdash; 필터됨 &mdash; 사용자 컴포넌트
              표시, 프레임워크 내부 숨김
            </li>
            <li>
              <strong>Detailed</strong> &mdash; 스마트 &mdash; CSS 클래스 이름과
              연관된 컴포넌트만
            </li>
            <li>
              <strong>Forensic</strong> &mdash; 전체 &mdash; 프레임워크 내부를
              포함한 모든 컴포넌트
            </li>
          </ul>
        </section>

        <section>
          <h2 id="keyboard-shortcuts">키보드 단축키</h2>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.875rem',
            }}
          >
            <tbody>
              <tr>
                <td
                  style={{
                    padding: '0.5rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                  }}
                >
                  <code>Cmd+Shift+F</code> / <code>Ctrl+Shift+F</code>
                </td>
                <td
                  style={{
                    padding: '0.5rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    color: 'rgba(0,0,0,0.5)',
                    textAlign: 'right',
                  }}
                >
                  피드백 모드 전환
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: '0.5rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                  }}
                >
                  <code>Esc</code>
                </td>
                <td
                  style={{
                    padding: '0.5rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    color: 'rgba(0,0,0,0.5)',
                    textAlign: 'right',
                  }}
                >
                  툴바 닫기 또는 취소
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: '0.5rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                  }}
                >
                  <code>P</code>
                </td>
                <td
                  style={{
                    padding: '0.5rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    color: 'rgba(0,0,0,0.5)',
                    textAlign: 'right',
                  }}
                >
                  애니메이션 일시정지/재개
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: '0.5rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                  }}
                >
                  <code>H</code>
                </td>
                <td
                  style={{
                    padding: '0.5rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    color: 'rgba(0,0,0,0.5)',
                    textAlign: 'right',
                  }}
                >
                  마커 숨기기/표시
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: '0.5rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                  }}
                >
                  <code>C</code>
                </td>
                <td
                  style={{
                    padding: '0.5rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    color: 'rgba(0,0,0,0.5)',
                    textAlign: 'right',
                  }}
                >
                  피드백 복사
                </td>
              </tr>
              <tr>
                <td style={{ padding: '0.5rem 0' }}>
                  <code>X</code>
                </td>
                <td
                  style={{
                    padding: '0.5rem 0',
                    color: 'rgba(0,0,0,0.5)',
                    textAlign: 'right',
                  }}
                >
                  모든 어노테이션 삭제
                </td>
              </tr>
            </tbody>
          </table>
          <p
            style={{
              fontSize: '0.75rem',
              color: 'rgba(0,0,0,0.5)',
              marginTop: '0.75rem',
            }}
          >
            입력 필드에 타이핑 중일 때는 단축키가 비활성화됩니다.
          </p>
        </section>

        <section>
          <h2 id="agent-sync">에이전트 동기화</h2>
          <p>
            <a href="/mcp">MCP 연동</a>과{' '}
            <a href="/schema">어노테이션 포맷 스키마</a>를 통해 어노테이션은
            양방향 대화가 됩니다. 에이전트는 피드백을 조회하고, 응답하고, 관리할
            수 있습니다:
          </p>
          <AgentChatDemo />
          <p
            style={{
              marginTop: '0.5rem',
              fontSize: '0.8125rem',
              color: 'rgba(0,0,0,0.5)',
            }}
          >
            에이전트는 확인, 질문, 요약과 함께 해결, 또는 이유와 함께 거부할 수
            있습니다.
          </p>
        </section>

        <section>
          <h2 id="settings">설정</h2>
          <p>
            <svg
              style={{
                display: 'inline-block',
                verticalAlign: '-0.38em',
                width: '1.5em',
                height: '1.5em',
                margin: '0 -0.1em',
              }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10.6504 5.81117C10.9939 4.39628 13.0061 4.39628 13.3496 5.81117C13.5715 6.72517 14.6187 7.15891 15.4219 6.66952C16.6652 5.91193 18.0881 7.33479 17.3305 8.57815C16.8411 9.38134 17.2748 10.4285 18.1888 10.6504C19.6037 10.9939 19.6037 13.0061 18.1888 13.3496C17.2748 13.5715 16.8411 14.6187 17.3305 15.4219C18.0881 16.6652 16.6652 18.0881 15.4219 17.3305C14.6187 16.8411 13.5715 17.2748 13.3496 18.1888C13.0061 19.6037 10.9939 19.6037 10.6504 18.1888C10.4285 17.2748 9.38135 16.8411 8.57815 17.3305C7.33479 18.0881 5.91193 16.6652 6.66952 15.4219C7.15891 14.6187 6.72517 13.5715 5.81117 13.3496C4.39628 13.0061 4.39628 10.9939 5.81117 10.6504C6.72517 10.4285 7.15891 9.38134 6.66952 8.57815C5.91193 7.33479 7.33479 5.91192 8.57815 6.66952C9.38135 7.15891 10.4285 6.72517 10.6504 5.81117Z" />
              <circle cx="12" cy="12" r="2.5" />
            </svg>{' '}
            아이콘을 클릭하면 워크플로우에 맞게 Agentation을 커스터마이즈할 수
            있습니다.
          </p>
          <SettingsDemo />
        </section>

        <section className="limitations-section">
          <h3
            style={{
              fontSize: '0.75rem',
              fontWeight: 500,
              color: 'rgba(0,0,0,0.45)',
              marginBottom: '0.5rem',
            }}
          >
            제한 사항
          </h3>
          <ul
            style={{
              fontSize: '0.75rem',
              color: 'rgba(0,0,0,0.5)',
              lineHeight: 1.5,
            }}
          >
            <li>
              <strong>데스크톱 전용</strong> &mdash; 데스크톱 브라우저 필요
            </li>
            <li>
              <strong>페이지별 저장</strong> &mdash; localStorage에 7일간
              유지됩니다. 페이지 간 영구 저장은{' '}
              <a href="/install#agent-integration">MCP 서버</a>를 사용하세요.
            </li>
            <li>
              <strong>고정 위치</strong> &mdash; 레이아웃이 변경되어도 마커
              위치는 업데이트되지 않습니다
            </li>
            <li>
              <strong>스크린샷 없음</strong> &mdash; 출력은 텍스트 전용입니다
            </li>
            <li>
              <strong>애니메이션 일시정지</strong> &mdash; 페이지의 대부분의
              애니메이션과 동영상을 정지시킵니다. 일부 서드파티 애니메이션
              라이브러리는 완전히 정지하지 않을 수 있습니다.
            </li>
            <li>
              <strong>React 18+ 전용</strong>
            </li>
          </ul>
        </section>
      </article>

      <Footer />
    </>
  );
}
