define([
  'core/js/adapt',
  './themePageView',
  './themeArticleView',
  './themeBlockView',
  './themeView'
], function(Adapt, ThemePageView, ThemeArticleView, ThemeBlockView, ThemeView) {

  function onDataReady() {
    $('html').addClass(Adapt.course.get('_courseStyle'));
  }

  function onPostRender(view) {
    const model = view.model;
    const theme = model.get('_odi-theme');

    if (!theme) return;

    switch (model.get('_type')) {
      case 'page':
        new ThemePageView({ model: new Backbone.Model(theme), el: view.$el });
        break;
      case 'article':
        new ThemeArticleView({ model: new Backbone.Model(theme), el: view.$el });
        break;
      case 'block':
        new ThemeBlockView({ model: new Backbone.Model(theme), el: view.$el });
        break;
      default:
        new ThemeView({ model: new Backbone.Model(theme), el: view.$el });
    }

    document.querySelectorAll('a[target="_blank"]').forEach(link => {
      addNoOpener(link);
      addNewTabMessage(link);
    });

    Array.from(document.querySelectorAll('a[name]')).filter(link => /\.[^.]+$/.test(link.getAttribute('name'))).forEach(link => {
      addDownload(link);
    });

  }

  function addDownload(link) {
    link.setAttribute('download', link.getAttribute('name'));
  }

  function addNoOpener(link) {
    const linkTypes = (link.getAttribute('rel') || '').split(' ');
    if (!linkTypes.includes('noopener')) {
      linkTypes.push('noopener');
    }
    link.setAttribute('rel', linkTypes.join(' ').trim());
  }

  function addNewTabMessage(link) {
    if (link.getAttribute('aria-label')) {
      return;
    }
    link.setAttribute('aria-label', link.innerHTML + ' - link opens in a new tab');
    link.setAttribute('title', link.innerHTML);
    // Get the computed color value of the <a> tag
    const computedColor = getComputedStyle(link).color;

    // SVG code to insert
    const svgCode = ` <svg xmlns="http://www.w3.org/2000/svg" height="0.6em" viewBox="0 0 512 512" fill="${computedColor}"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M352 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9L370.7 96 201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L416 141.3l41.4 41.4c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V32c0-17.7-14.3-32-32-32H352zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"/></svg>`;

    // Insert the SVG code as HTML directly after the closing <a> tag
    link.insertAdjacentHTML('afterend', svgCode);
  }

  Adapt.on({
    'app:dataReady': onDataReady,
    'pageView:postRender articleView:postRender blockView:postRender': onPostRender
  });
});
