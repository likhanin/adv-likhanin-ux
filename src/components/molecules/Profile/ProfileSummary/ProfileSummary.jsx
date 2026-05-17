import profileAvatar from '../../../../assets/perfagency-avatar.svg'
import { Avatar } from '../../../atoms/Avatar/Avatar'
import { Text } from '../../../atoms/Text/Text'
import { useModal } from '../../../../store/modal/useModal'
import './ProfileSummary.css'

export function ProfileSummary({ title, rating, reviews }) {
  const { openModal } = useModal()

  const handleAvatarPreviewOpen = () => {
    openModal({
      title,
      size: 'm',
      content: (
        <div className="profile-summary__avatar-preview">
          <img className="profile-summary__avatar-preview-image" src={profileAvatar} alt={title} />
        </div>
      ),
    })
  }

  return (
    <div className="profile-summary">
      <button
        className="profile-summary__avatar-button"
        type="button"
        aria-label={title}
        onClick={handleAvatarPreviewOpen}
      >
        <Avatar variant="single" className="profile-summary__avatar" src={profileAvatar} alt={title} />
      </button>
      <div>
        <Text as="h6" variant="h6" className="profile-summary__title">
          {title}
        </Text>
        <Text variant="s20" className="profile-summary__rating">
          <strong>{rating}</strong> <span className="profile-summary__star">★</span> {reviews}
        </Text>
      </div>
    </div>
  )
}
