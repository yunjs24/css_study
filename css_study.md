# FLEX

## justify-content
- flex-start : 요소들을 컨테이너 왼쪽으로 정렬
- flex-end : 요소들을 컨테이너 오른쪽으로 정렬
- center : 가운데로 정렬
- space-between : 요소들 사이에 동일 간격을 둔다.
- space-around : 요소들 주위에 동일 간격을 둔다.

## align-items
- flex-start : 요소들을 컨테이너의 꼭대기로 정렬
- flex-end : 바닥으로 정렬
- center : 가운데로 정렬
- baseline : 컨네이너의 시작 위치에 정렬
- stretch : 컨테이너에 맞게 늘림

## flex-direction
- row : 요소들을 text 방향으로 정렬.
- row-reverse : 요소들을 text 반대방향 정렬.
- column : 요소들을 위에서 아래로 정렬
- column-reverse : 요소들을 아래에서 위로 정렬

## flex-wrap
- nowrap : 한줄에 전부 정렬한다
- wrap : 줄이 가득차면 새 줄을 열어 정렬을 이어간다.
- wrap-reverse : wrap + 역순 정렬

## flex-flow
- flex-direction과 flex-wrap의 속성을 공백을 두고 순서 상관 없이 인자로 받는다

```css
{
	flex-flow : wrap cloumn-reverse;
}
```
## align-content
- flex-start: 여러 줄들을 컨테이너의 꼭대기에 정렬합니다.
- flex-end: 여러 줄들을 컨테이너의 바닥에 정렬합니다.
- center: 여러 줄들을 세로선 상의 가운데에 정렬합니다.
- space-between: 여러 줄들 사이에 동일한 간격을 둡니다.
- space-around: 여러 줄들 주위에 동일한 간격을 둡니다.
- stretch: 여러 줄들을 컨테이너에 맞도록 늘립니다.

