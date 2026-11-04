import { useEffect, useState } from 'react';
import {
  DEFAULT_LANGUAGE,
  getDictionary,
  isSupportedLanguage,
  type Language,
} from '@/i18n';
import { readStorage, STORAGE_KEYS } from '@/lib/storage';
import { ButtonLink, EmptyState } from '@/components/ui';

export function NotFoundWorkspace() {
  const [lang, setLang] = useState<Language>(DEFAULT_LANGUAGE);

  useEffect(() => {
    const saved = readStorage(STORAGE_KEYS.language);
    if (isSupportedLanguage(saved)) {
      setLang(saved);
    }
  }, []);

  const t = getDictionary(lang);

  return (
    <div className="min-h-dvh w-full max-w-full overflow-x-clip flex items-center justify-center p-4 sm:p-6 studio-grid-bg">
      <div className="w-full max-w-md min-w-0">
        <EmptyState
          icon="terminal"
          meta={t.notFound.meta}
          title={t.notFound.title}
          description={t.notFound.description}
          action={
            <ButtonLink href="/" variant="primary" size="md">
              {t.common.returnToWorkspace}
            </ButtonLink>
          }
        />
      </div>
    </div>
  );
}
