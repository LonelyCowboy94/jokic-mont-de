import styles from './StepResult.module.scss';

interface StepResultProps {
  status: 'success' | 'error';
  onRestart: () => void;
}

export default function StepResult({ status, onRestart }: StepResultProps) {
  return (
    <div className={styles['step-result']}>
      <h2 className={styles['step-result__title']}>
        {status === 'success'
          ? '✅ Termin erfolgreich gesendet!'
          : '❌ Es gab einen Fehler beim Senden.'}
      </h2>

      <button
        className={styles['step-result__button']}
        onClick={onRestart}
      >
        Neuen Termin auswählen
      </button>
    </div>
  );
}
