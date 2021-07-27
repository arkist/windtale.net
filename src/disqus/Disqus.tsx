import * as React from 'react';
import {FC, useEffect} from 'react';
import {insertScript, removeScript} from './utils';

type Props ={
  shortname: string
  config: {
    identifier: string
    title: string
    url?: string
    language?: string
    remoteAuthS3?: string
    apiKey?: string
  }
}

export const Disqus: FC<Props> = props => {
  const { config, shortname } = props

  useEffect(() => {
    const loadInstance = () => {
      if (typeof window !== 'undefined' && window.document) {
        // @ts-ignore
        window.disqus_config = function() {
          this.page.identifier = config.identifier || document.location.href;
          this.page.url = config.url || document.location.href;
          this.page.title = config.title || document.title;
          this.page.remote_auth_s3 = config.remoteAuthS3;
          this.page.api_key = config.apiKey;
          this.language = config.language;
        }
        if (window.document.getElementById('dsq-embed-scr')) {
          // @ts-ignore
          window.DISQUS?.reset({
            reload: true,
          })
        } else {
          const embedUrl = `https://${shortname}.disqus.com/embed.js`
          insertScript(embedUrl, 'sdq-embed-scr', window.document.body)
        }
      }
    }
    const cleanInstance = () => {
      removeScript('dsq-embed-scr', window.document.body)
      try {
        // @ts-ignore
        delete window.DISQUS
      } catch (err) {
        // @ts-ignore
        window.DISQUS = undefined
      }
      const thread = window.document.getElementById('disqus_thread')
      if (thread) {
        while (thread.hasChildNodes()) {
          thread.removeChild(thread.firstChild)
        }
      }

      const iframeQuery = window.document.querySelector('[id^="dsq-app"]')
      if (iframeQuery) {
        const iframe = window.document.getElementById(iframeQuery.id)
        iframe.parentNode.removeChild(iframe)
      }
    }

    loadInstance()

    return () => {
      cleanInstance()
    }
  }, [shortname, config])

  return (
    <div id="disqus_thread" />
  )
}
