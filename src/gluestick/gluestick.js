import React from 'react';

export default class Gluestick extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStick: null,
    };
  }

  observeStickyHeaderChanges = container => {
    this.observeQuestion(container);
    // this.observeSentinelTop(container);
  };

  observeQuestion = container => {
    const observer = new IntersectionObserver((records, observer) => {
      for (const record of records) {
        console.log({ record });

        const targetInfo = record.boundingClientRect;
        const stickyTarget = record.target;
        const rootBoundsInfo = record.rootBounds;
        const ratio = record.intersectionRatio;
        const currentStuck = this.state.currentStickNode;

        const bottomOfStuck = currentStuck && currentStuck.offsetHeight;
        // debugger;

        // Scrolled out of view.
        if (targetInfo.bottom < rootBoundsInfo.top) {
          // debugger;
          // IF currentStuck === stickyTarget
          // Is current stick + 1 in view?
          //   incrementCurrentStick
          // else
          //   decrementCurrentStick
          // debugger;

          if (currentStuck === stickyTarget) {
            this.incrementCurrentStick();
          } else {
            this.decrementCurrentStick();
          }
          this.fireEvent(false, stickyTarget);
        }

        // Stuck to top
        if (stickyTarget.offsetTop === 0) {
          // debugger;
          this.fireEvent(true, stickyTarget);
        }

        // started sticking
        // if (
        //   targetInfo.bottom > rootBoundsInfo.top && ratio === 1
        // ) {
        //   debugger;
        //   this.fireEvent(true, stickyTarget);
        // }
        // if (targetInfo.top === rootBoundsInfo.top && ratio === 1) {
        //   this.fireEvent(true, stickyTarget);
        // }

        // Stopped sticking.
        // if (targetInfo.bottom >= rootBoundsInfo.top &&
        //   targetInfo.bottom < rootBoundsInfo.bottom &&
        //   targetInfo.top !== rootBoundsInfo.top
        // ) {
        //   debugger;
        //   this.fireEvent(false, stickyTarget);
        // }
      }
    }, { threshold: [0], root: container });

    // Add the top sentinels to each section and attach an observer.
    const sentinels = document.querySelectorAll('.question');
    window.sentinels = sentinels;
    sentinels.forEach(el => observer.observe(el));
  };

  // observeSentinelTop = container => {
  //   const observer = new IntersectionObserver((records, observer) => {
  //     for (const record of records) {
  //       const targetInfo = record.boundingClientRect;
  //       const stickyTarget = record.target.parentElement;
  //       const rootBoundsInfo = record.rootBounds;
  //       const currentStuck = this.state.currentStickNode;

  //       const bottomOfStuck = currentStuck && currentStuck.offsetHeight;

  //       debugger;
  //       // Started sticking.
  //       if (targetInfo.top < rootBoundsInfo.top) {
  //         this.fireEvent(true, stickyTarget);
  //       }

  //       // Stopped sticking.
  //       if (targetInfo.bottom >= rootBoundsInfo.top &&
  //         targetInfo.bottom < rootBoundsInfo.bottom) {
  //         this.fireEvent(false, stickyTarget);
  //       }
  //     }
  //   }, { threshold: [0], root: container });

  //   // Add the top sentinels to each section and attach an observer.
  //   const sentinels = document.querySelectorAll('.glue-sentinel__top');
  //   window.sentinelTops = sentinels;
  //   sentinels.forEach(el => observer.observe(el));
  // }

  fireEvent = (stuck, target) => {
    const e = new CustomEvent('sticky-change', { detail: { stuck, target } });
    document.dispatchEvent(e);
  }

  setCurrentStick = (id, node) => {
    this.setState({
      currentStick: id,
      currentStickNode: node
    });
  };

  incrementCurrentStick = () => {
    if (this.state.currentStick === null) return;
    this.setState(prevState => {
      const currentStick = Number(prevState.currentStick) + 1;
      const next = document.getElementById(currentStick);
      // debugger;
      // const elementToHideHeight = next.querySelector('.question-table');
      // document.getElementById('scroll-container').scroll(
      //   elementToHideHeight.offsetTop,
      //   elementToHideHeight.offsetTop
      // );
      return {
        currentStick,
        currentStickNode: next,
      };
    }, () => {
      document.getElementById('scroll-container').scroll(
        this.state.currentStickNode.offsetTop + 1,
        this.state.currentStickNode.offsetTop + 1
      )
    });
  };

  decrementCurrentStick = () => {
    if (this.state.currentStick === null) return;
    this.setState(prevState => {
      const currentStick = Number(prevState.currentStick) - 1;
      const previous = document.getElementById(currentStick);
      document.getElementById('scroll-container').scroll(
        previous.offsetTop,
        previous.offsetTop
      );
      return {
        currentStick,
        currentStickNode: previous
      };
    }, () => {
      console.log(this.state);
    });
  };

  handleStickyChange = e => {
    const header = e.detail.target;  // header became sticky or stopped sticking.
    const sticking = e.detail.stuck; // true when header is sticky.
    console.log(header.id, sticking);

    if (sticking) {
      this.setCurrentStick(header.id, e.detail.target);
    }
  }

  stickyListener = () => {
    document.addEventListener('sticky-change', this.handleStickyChange);
  }

  componentDidMount() {
    const container = document.querySelector('#scroll-container');
    this.observeStickyHeaderChanges(container);
    this.stickyListener();
  }

  render() {
    console.log(this.state);
    return this.props.children(this.state.currentStick);
  }
}
