import { useTranslation } from 'react-i18next';
import Empty from 'components/Empty'
export default function AuthRecord() {
  const { t } = useTranslation();
  return (
    <div className="auth-record-box">
      <Empty />
      <p className="no-txt">{t('chome.data_empty')}</p>
    </div>
  )
}