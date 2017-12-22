function bindEventOfDispalyDetail() {
  let isDontShowDetailBlock = $('.navbar-toggler:eq(0)').is(':visible');
  if (isDontShowDetailBlock) {
    return;
  }

  // elements
  let firstDetail$ = $('.detail:eq(0)');
  let salesInfos$ = $('.salesInfo');
  let navbarToggler = $('.navbar-toggler:eq(0)');


  // funtions
  let handlerIn = function (target) {
    const navbarTogglerStyles = getComputedStyle(navbarToggler[0]);
    const isMobile = navbarTogglerStyles.display !== 'none';
    if(isMobile){
      firstDetail$.hide();
      return;
    }

    let iconWidth = 25;

    var firstImgStartX = target.currentTarget.offsetLeft;

    var classPrefix = 'salesInfo';

    var dataType = $(target.currentTarget).attr('data-type');
    firstDetail$.find('.' + classPrefix)
      .each(function (index, salesInfo) {
        var salesInfo$ = $(salesInfo);
        if (salesInfo$.hasClass(classPrefix + '-' + dataType)) {
          salesInfo$.show();
        } else {
          salesInfo$.hide();
        }
      })

    firstDetail$.css('padding-left', firstImgStartX).slideDown();

  };

  let handlerOut = function (target) {

    var isLeaveFormDetailBlock = function () {
      return target.currentTarget.className.indexOf('detail') > -1;
    }

    var isMoveOutScopeOfNavItem = function () {
      var naveItem = target.currentTarget;

      var isMoveOutScope = function () {
        var offsetRight = naveItem.offsetLeft + naveItem.clientWidth;
        return (target.pageX < naveItem.offsetLeft || target.pageX > offsetRight);
      }

      var isAboveNav = function () {
        return target.pageY < naveItem.offsetHeight;
      }

      var detectMoveOutRules = [
        isMoveOutScope,
        isAboveNav,
      ]

      for (var detectMoveOutRule of detectMoveOutRules) {
        var isMoveOut = detectMoveOutRule();
        if (isMoveOut) {
          return true;
        }
      }
    }

    var hiddenRules = [
      isLeaveFormDetailBlock,
      // isMoveOutScopeOfNavItem
    ];
    var isHidden = false;
    hiddenRules.forEach(function (hiidenRule) {
      isHidden = hiidenRule() === true;
      if (isHidden) {
        isHidden = true;
        firstDetail$.hide();
        return;
      }
    });

    // var isShow = !isHidden;
    // if (isShow) {
    //   var currentMouseEvent;
    //   const docOnMouseOverEveent = $(document).mousemove(function (e) {
    //     currentMouseEvent = e;
    //   });
    //   const reCheckMousePositionBufferTime = 500;
    //   setTimeout(() => {
    //     const isOverMoveY = currentMouseEvent.clientY > (firstDetail$.height() + firstDetail$.position().top);
    //     if(isOverMoveY){
    //       firstDetail$.stop(true, false).slideUp();
    //     }
    //     // console.log('isOverflowY', isOverMoveY);
    //     docOnMouseOverEveent.unbind();
    //   }, reCheckMousePositionBufferTime);
    // }


  };


  var navItems$ = $('.nav-item');
  navItems$.mouseenter(handlerIn);
  navItems$.mouseleave(handlerOut);
  firstDetail$.mouseleave(handlerOut);
}



function toggleNavBarTheme(window$, navBar$, targetY) {
  let currentY = window$.scrollTop();

  let isNeedToggleToLightTheme = currentY > (targetY);
  const cssClassOfLight = 'navbar-light';
  const cssClassOfDark = 'navbar-dark';

  if (isNeedToggleToLightTheme) {
    navBar$.addClass(cssClassOfLight);
    navBar$.removeClass(cssClassOfDark);
  } else {
    navBar$.addClass(cssClassOfDark);
    navBar$.removeClass(cssClassOfLight);
  }
}

function bindEventOfToggleNavBarTheme(param) {
  let toggleOffset = $(param.toogleElementSelector).offset();
  let targetY = 0;
  if (toggleOffset) {
    targetY = toggleOffset.top;
  } else {
    let impossibleToggleOffsetTop = 99999999;
    targetY = impossibleToggleOffsetTop;
  }

  let window$ = $(window);
  let navBar$ = $('.navbar:eq(0)');

  targetY = (targetY * param.offsetPercent) / 100;

  toggleNavBarTheme(window$, navBar$, targetY);
  var scrollEvent$ = window$.scroll(function (e) {
    toggleNavBarTheme(window$, navBar$, targetY);
  });

  return scrollEvent$;
}

function unBindEventofToggleNavBarTheme(scrollEvent$) {
  if (scrollEvent$ && scrollEvent$.unbind) {
    scrollEvent$.unbind();
  }
}

function bindClickEventOfTogglerIcon() {
  var navbarCollapse$ = $('.navbar-collapse');
  var navIcon$ = $('.navbar-toggler-icon:eq(0)');
  var body$ = $('body');
  var classNameOfOpenMenu = 'open';
  navbarCollapse$.on('show.bs.collapse', function () {
    // 
    navIcon$.addClass(classNameOfOpenMenu);
    //
    var disableScrollBodyContent = function () {
      body$.css({
        'overflow': 'hidden'
      });
    };
    disableScrollBodyContent();
    //

  });

  navbarCollapse$.on('hide.bs.collapse', function () {
    //
    navIcon$.removeClass(classNameOfOpenMenu);
    //
    var enbaleScrollBodyContent = function () {
      body$.css({
        'overflow': ''
      });
    };
    enbaleScrollBodyContent();
    //
  });
}

// function redirectToPageNeedCloseTogglerBlock(param) {
//   $('.nav-link , .logo').click(function () {
//     param.navbarCollapse$.collapse('hide');
//   });
// }

function closeTogglerBlockWhenClickedBody(param) {
  $(document).ready(function () {
    $(document).click(function (event) {
      param.navbarCollapse$.collapse('hide');
    });
  });
}



$(document).ready(function () {
  bindEventOfDispalyDetail();
  bindClickEventOfTogglerIcon();

  var navbarCollapse$ = $('.navbar-collapse');
  // redirectToPageNeedCloseTogglerBlock({
  //   navbarCollapse$:navbarCollapse$
  // });
  closeTogglerBlockWhenClickedBody({
    navbarCollapse$: navbarCollapse$
  });

});
