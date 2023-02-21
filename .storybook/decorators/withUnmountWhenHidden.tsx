import ReactDOM from 'react-dom';

export function withUnmountWhenHidden(Story, context) {
  if (context.canvasElement) {
    const config = { attributeFilter: ['hidden'] };

    const observer = new MutationObserver(() => {
      if (context.canvasElement.getAttribute('hidden') === 'true') {
        ReactDOM.unmountComponentAtNode(context.canvasElement);
        observer.disconnect();
      }
    });

    observer.observe(context.canvasElement, config);
  }
  return <Story />;
}
