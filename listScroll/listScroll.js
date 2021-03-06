
class ListScroll {
    constructor(options) {
        this.opsCheck(options);
    }

    opsCheck(ops) {
        if (!ops || typeof ops !== 'object') {
            throw new Error('options are illegal');
        }

        const {
            firstItemId,
            lastItemId,
            itemHeight,
            container,
            listSize,
            renderFunction
        } = ops;

        if (!firstItemId) {
            throw new Error('firstItemId can not be null');
        }

        if (!lastItemId) {
            throw new Error('lastItemId can not be null');
        }

        if (!itemHeight || typeof itemHeight !== 'number') {
            throw new Error('itemHeight is illegal');
        }

        if (!renderFunction || typeof renderFunction !== 'function') {
            throw new Error('lastItemId is illegal');
        }

        if (!listSize) {
            throw new Error('listSize is illegal');
        }

        if (!container || !container.nodeType) {
            throw new Error('root is illegal');
        }

        this.itemHeight = itemHeight;
        this.firstItemId = firstItemId;
        this.lastItemId = lastItemId;
        this.container = container;
        this.listSize = listSize;
        this.renderFunction = renderFunction;

        this.firstItem = document.getElementById(firstItemId);
        this.lastItem = document.getElementById(lastItemId);

        this.domDataCache = {
            currentPaddingTop: 0,
            currentPaddingBottom: 0,
            topSentinelPreviousY: 0,
            topSentinelPreviousRatio: 0,
            bottomSentinelPreviousY: 0,
            bottomSentinelPreviousRatio: 0,
            currentIndex: 0
        };
    }

    updateDomDataCache(params) {
        Object.assign(this.domDataCache, params);
    }

    adjustPaddings(isScrollDown) {
        const { container, itemHeight } = this;
        const { currentPaddingTop, currentPaddingBottom } = this.domDataCache;

        let newCurrentPaddingTop, newCurrentPaddingBottom;

        const remPaddingsVal = itemHeight * (Math.floor(this.listSize / 2));

        if (isScrollDown) {
            newCurrentPaddingTop = currentPaddingTop + remPaddingsVal;

            if (currentPaddingBottom === 0) {
                newCurrentPaddingBottom = 0;
            } else {
                newCurrentPaddingBottom = currentPaddingBottom - remPaddingsVal;
            }
        } else {
            newCurrentPaddingBottom = currentPaddingBottom + remPaddingsVal;

            if (currentPaddingTop === 0) {
                newCurrentPaddingTop = 0;
            } else {
                newCurrentPaddingTop = currentPaddingTop - remPaddingsVal;
            }
        }

        container.style.paddingBottom = `${newCurrentPaddingBottom}px`;
        container.style.paddingTop = `${newCurrentPaddingTop}px`;

        this.updateDomDataCache({
            currentPaddingTop: newCurrentPaddingTop,
            currentPaddingBottom: newCurrentPaddingBottom
        });
    }

    getWindowFirstIndex = (isScrollDown) => {
        const {
            currentIndex
        } = this.domDataCache;

        const increment = Math.floor(this.listSize / 2);

        let firstIndex;

        if (isScrollDown) {
            firstIndex = currentIndex + increment;
        } else {
            firstIndex = currentIndex - increment;
        }

        if (firstIndex < 0) {
            firstIndex = 0;
        }

        return firstIndex;
    }

    topItemCb(entry) {
        const {
            topSentinelPreviousY,
            topSentinelPreviousRatio
        } = this.domDataCache;

        const currentY = entry.boundingClientRect.top;
        const currentRatio = entry.intersectionRatio;
        const isIntersecting = entry.isIntersecting;

        if (
            currentY > topSentinelPreviousY
            && isIntersecting
            && currentRatio >= topSentinelPreviousRatio
        ) {
            console.log('topSentCallback.. go');
            const firstIndex = this.getWindowFirstIndex(false);
            this.renderFunction(firstIndex);
            this.adjustPaddings(false);

            this.updateDomDataCache({
                currentIndex: firstIndex,
                topSentinelPreviousY: currentY,
                topSentinelPreviousRatio: currentRatio
            });
        } else {
            this.updateDomDataCache({
                topSentinelPreviousY: currentY,
                topSentinelPreviousRatio: currentRatio
            });
        }
    }

    bottomItemCb(entry) {
        const {
            bottomSentinelPreviousY,
            bottomSentinelPreviousRatio
        } = this.domDataCache;

        // TODO???hasMore
        // if (currentIndex === DBSize - listSize) {
        //     return;
        // }

        const currentY = entry.boundingClientRect.top;
        const currentRatio = entry.intersectionRatio;
        const isIntersecting = entry.isIntersecting;

        if (
            currentY < bottomSentinelPreviousY
            && currentRatio >= bottomSentinelPreviousRatio
            && isIntersecting
        ) {
            console.log('botSentCallback.. go');
            const firstIndex = this.getWindowFirstIndex(true);

            this.renderFunction(firstIndex);
            this.adjustPaddings(true);

            this.updateDomDataCache({
                currentIndex: firstIndex,
                bottomSentinelPreviousY: currentY,
                bottomSentinelPreviousRatio: currentRatio
            });
        } else {
            this.updateDomDataCache({
                bottomSentinelPreviousY: currentY,
                bottomSentinelPreviousRatio: currentRatio
            });
        }
    }

    initIntersectionObserver() {
        const options = {
            // root: this.container
        };

        const callback = (entries) => {
            entries.forEach((entry) => {
                if (entry.target.id === this.firstItemId) {
                    this.topItemCb(entry);
                } else if (entry.target.id === this.lastItemId) {
                    this.bottomItemCb(entry);
                }
            });
        };

        this.observer = new IntersectionObserver(callback, options);
        this.observer.observe(this.firstItem);
        this.observer.observe(this.lastItem);
    }

    startObserver() {
        this.initIntersectionObserver();
    }

}
