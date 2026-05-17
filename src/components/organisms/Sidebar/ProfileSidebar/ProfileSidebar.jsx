import { PostpayDebtSummary } from '../../../molecules/Profile/PostpayDebtSummary/PostpayDebtSummary'
import { ProfileSummary } from '../../../molecules/Profile/ProfileSummary/ProfileSummary'
import { WalletSummary } from '../../../molecules/Profile/WalletSummary/WalletSummary'
import './ProfileSidebar.css'

export function ProfileSidebar({ profile, wallet, postpayDebt = null }) {
  const hasPostpayDebt = Number(postpayDebt?.progress ?? 0) > 0
  const shouldShowPostpayLayer = Boolean(postpayDebt)

  return (
    <section className="profile-sidebar">
      <ProfileSummary title={profile.title} rating={profile.rating} reviews={profile.reviews} />
      <div
        className={`profile-sidebar__wallet-stack${hasPostpayDebt ? ' profile-sidebar__wallet-stack--debt' : ''}`}
      >
        <div className="profile-sidebar__wallet-layer">
          <WalletSummary
            label={wallet.label}
            amount={wallet.amount}
            note={wallet.note}
            action={wallet.action}
          />
        </div>
        {shouldShowPostpayLayer ? (
          <div className="profile-sidebar__debt-layer profile-sidebar__debt-layer--visible">
            <PostpayDebtSummary
              title={postpayDebt?.title ?? ''}
              usageLabel={postpayDebt?.usageLabel ?? ''}
              dueLabel={postpayDebt?.dueLabel ?? ''}
              progress={postpayDebt?.progress ?? 0}
            />
          </div>
        ) : null}
      </div>
    </section>
  )
}
