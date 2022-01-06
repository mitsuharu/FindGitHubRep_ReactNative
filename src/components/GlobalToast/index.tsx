import { dequeueToast } from '@/redux/modules/toast/actions'
import { selectToastItem } from '@/redux/modules/toast/selectors'
import { ToastItem } from '@/redux/modules/toast/state'
import React, { useCallback, useEffect } from 'react'
import Toast from 'react-native-toast-message'
import { useDispatch, useSelector } from 'react-redux'

export const GlobalToast: React.FC = () => {
  const dispatch = useDispatch()
  const toastItem: ToastItem | undefined = useSelector(selectToastItem)

  const onHide = useCallback(
    (item: ToastItem) => {
      dispatch(dequeueToast({ createdAt: item.createdAt }))
    },
    [dispatch],
  )

  const showToast = useCallback(
    (item: ToastItem) => {
      Toast.show({
        type: item.type,
        text1: item.message,
        onHide: () => onHide(item),
      })
    },
    [onHide],
  )

  useEffect(() => {
    if (toastItem) {
      showToast(toastItem)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastItem])

  return <Toast />
}
