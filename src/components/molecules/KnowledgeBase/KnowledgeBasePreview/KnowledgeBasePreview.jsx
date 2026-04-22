import addClientPreview from '../../../../assets/img/knowlage_base/dobavlenie-qlienta.png'
import addEmployeePreview from '../../../../assets/img/knowlage_base/dobavlenie-sotrydniqa.png'
import analyticsPreview from '../../../../assets/img/knowlage_base/anal.png'
import financePreview from '../../../../assets/img/knowlage_base/finance.png'
import firstStepsPreview from '../../../../assets/img/knowlage_base/pervie-shagi.png'
import clientVerificationPreview from '../../../../assets/img/knowlage_base/proverqa-klienta.png'
import clientsListPreview from '../../../../assets/img/knowlage_base/spisok-clientov.png'
import './KnowledgeBasePreview.css'

const PREVIEW_IMAGES = {
  'first-steps': firstStepsPreview,
  'add-employee': addEmployeePreview,
  'client-verification': clientVerificationPreview,
  'add-client': addClientPreview,
  'clients-list': clientsListPreview,
  finance: financePreview,
  'demand-analytics': analyticsPreview,
}

export function KnowledgeBasePreview({ article, previewDisabledLabel }) {
  const previewImage = article.previewId ? PREVIEW_IMAGES[article.previewId] : null

  return (
    <div
      className={`knowledge-base-panel__preview${
        previewImage ? '' : ' knowledge-base-panel__preview--disabled'
      }`}
      role="img"
      aria-label={article.previewLabel}
    >
      {previewImage ? (
        <img className="knowledge-base-panel__preview-image" src={previewImage} alt="" aria-hidden="true" />
      ) : (
        <div className="knowledge-base-panel__preview-empty">{previewDisabledLabel}</div>
      )}
    </div>
  )
}
