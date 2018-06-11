import React from 'react';

export default class Gluestick extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sticking: null
    };
  }

  observeStickyHeaderChanges = container => {
    this.observeHeaders(container);
    this.observeFooters(container);
  };

  observeHeaders = container => {
    const observer = new IntersectionObserver((records, observer) => {
      for (const record of records) {

        console.log('Header', { record });
        const targetInfo = record.boundingClientRect;
        const stickyTarget = record.target.parentElement;
        const rootBoundsInfo = record.rootBounds;

        // Started sticking.
        if (targetInfo.bottom < rootBoundsInfo.top) {
          // debugger;
          this.fireEvent(true, stickyTarget);
        }

        // Stopped sticking.
        if (targetInfo.bottom >= rootBoundsInfo.top &&
          targetInfo.bottom < rootBoundsInfo.bottom &&
          targetInfo.top !== rootBoundsInfo.top
        ) {
          this.fireEvent(false, stickyTarget);
        }
      }
    }, { threshold: [0], root: container });

    // Add the top sentinels to each section and attach an observer.
    const sentinels = document.querySelectorAll('.glue-sentinel__top');
    sentinels.forEach(el => observer.observe(el));
  };

  observeFooters = container => {
    const observer = new IntersectionObserver((records, observer) => {
      for (const record of records) {

        console.log('Footer ', { record });
        const targetInfo = record.boundingClientRect;
        const stickyTarget = record.target.parentElement;
        const rootBoundsInfo = record.rootBounds;
        const ratio = record.intersectionRatio;
        // Started sticking.
        if (
          targetInfo.bottom > rootBoundsInfo.top && ratio === 1
        ) {
          // debugger;
          this.fireEvent(true, stickyTarget);
        }

        // Stopped sticking.
        if (targetInfo.top < rootBoundsInfo.top &&
          targetInfo.bottom < rootBoundsInfo.bottom) {
          this.fireEvent(false, stickyTarget);
        }
      }
    }, { threshold: [1], root: container });

    // Add the bottom sentinels to each section and attach an observer.
    const sentinels = document.querySelectorAll('.glue-sentinel__bottom');
    this.adjustSentinelHeight(sentinels);
    sentinels.forEach(el => observer.observe(el));
  }

  addSentinels = (container, className) => {
    return Array.from(container.querySelectorAll('.sticky')).map(el => {
      const sentinel = document.createElement('div');
      sentinel.classList.add('glue-sentinel', className);
      return el.parentElement.appendChild(sentinel);
    });
  }

  adjustSentinelHeight = (sentinels) => {
    sentinels.forEach((sentinel) => {
      console.log({ sentinel });
      const height = sentinel.parentElement.offsetHeight;
      sentinel.style.height = `${height}px`;
    });
  };

  fireEvent = (stuck, target) => {
    const e = new CustomEvent('sticky-change', { detail: { stuck, target } });
    document.dispatchEvent(e);
  }

  handleStickyChange = e => {
    const header = e.detail.target;  // header became sticky or stopped sticking.
    const sticking = e.detail.stuck; // true when header is sticky.
    // header.classList.toggle('shadow', sticking); // add drop shadow when sticking.
    console.log(header, sticking);

    this.setState({
      sticking: header.id
    });

    // header.classList.toggle('selected', sticking);
    // if (sticking) {
    //   console.log(`${header.id} is now stuck.`);
    // }
    // else {
    //   console.log(`${header.id} is NOT sticking.`);
    // }
    // document.querySelector('.who-is-sticking').textContent = header.textContent;
  }

  stickyListener = () => {
    document.addEventListener('sticky-change', this.handleStickyChange);
  }

  componentDidMount() {
    const container = document.querySelector('#scroll-container');
    this.observeStickyHeaderChanges(container);
    this.stickyListener();

    // const firstNode = document.querySelector('#section-1');
    // if (firstNode.className.includes('selected')) {
    //   return;
    // }
    // firstNode.className += ' selected';
  }

  render() {
    return this.props.children(this.state.sticking);
  }
}
