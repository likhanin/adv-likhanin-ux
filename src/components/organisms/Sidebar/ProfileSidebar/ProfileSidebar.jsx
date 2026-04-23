import { useEffect, useState } from 'react'
import { PostpayDebtSummary } from '../../../molecules/Profile/PostpayDebtSummary/PostpayDebtSummary'
import { ProfileSummary } from '../../../molecules/Profile/ProfileSummary/ProfileSummary'
import { WalletSummary } from '../../../molecules/Profile/WalletSummary/WalletSummary'
import './ProfileSidebar.css'

export function ProfileSidebar({ profile, wallet, postpayDebt = null }) {
  const [isDebtMounted, setIsDebtMounted] = useState(Boolean(postpayDebt))
  const [isDebtVisible, setIsDebtVisible] = useState(Boolean(postpayDebt))

  useEffect(() => {
    if (postpayDebt) {
      let showAnimationFrameId = 0
      const mountAnimationFrameId = window.requestAnimationFrame(() => {
        setIsDebtMounted(true)
        showAnimationFrameId = window.requestAnimationFrame(() => {
          setIsDebtVisible(true)
        })
      })

      return () => {
        window.cancelAnimationFrame(mountAnimationFrameId)
        window.cancelAnimationFrame(showAnimationFrameId)
      }
    }

    const hideAnimationFrameId = window.requestAnimationFrame(() => {
      setIsDebtVisible(false)
    })

    const timeoutId = window.setTimeout(() => {
      setIsDebtMounted(false)
    }, 360)

    return () => {
      window.cancelAnimationFrame(hideAnimationFrameId)
      window.clearTimeout(timeoutId)
    }
  }, [postpayDebt])

  return (
    <section className="profile-sidebar">
      <ProfileSummary title={profile.title} rating={profile.rating} reviews={profile.reviews} />
      <div className="profile-sidebar__wallet-stack">
        <div className="profile-sidebar__wallet-layer">
          <WalletSummary
            label={wallet.label}
            amount={wallet.amount}
            note={wallet.note}
            action={wallet.action}
          />
        </div>
        {isDebtMounted ? (
          <div
            className={`profile-sidebar__debt-layer${isDebtVisible ? ' profile-sidebar__debt-layer--visible' : ''}`}
          >
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
