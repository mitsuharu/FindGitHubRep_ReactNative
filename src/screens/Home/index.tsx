import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native'
import { styleType } from '@/utils/styles'
import { useNavigation } from '@react-navigation/native'
import { MainName } from '@/routes/main.constraint'
import SearchBar from 'react-native-search-bar'
import { Repository } from '@/api/github/Repository'
import { RepItem } from './RepItem'
import { ItemSeparator } from '@/components/List/Separator'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import { makeStyles } from 'react-native-swag-styles'
import { COLOR } from '@/CONSTANTS/COLOR'
import { useSearchRepository } from './hooks/useSearchRepository'
import { enqueueToast } from '@/redux/modules/toast/actions'

type Props = {}
type ComponentProps = Props & {
  items: Repository[]
  onPress: (repository: Repository) => void
  searchText: string
  onChangeText: (text: string) => void
  onEndReached: () => void
  isRequesting: boolean
  searchBarRef: React.LegacyRef<SearchBar> | undefined
}

const Component: React.FC<ComponentProps> = ({
  items,
  onPress,
  searchText,
  onChangeText,
  onEndReached,
  isRequesting,
  searchBarRef,
}) => {
  const styles = useStyles()

  const renderItem = useCallback<ListRenderItem<Repository>>(
    ({ item }) => <RepItem repository={item} onPress={onPress} />,
    [onPress],
  )

  const keyExtractor = useCallback((item: Repository) => {
    return item.id.toString() + '-' + item.name
  }, [])

  const ListHeaderComponent = useMemo(() => {
    return (
      <SearchBar
        placeholder="Search"
        text={searchText}
        onChangeText={onChangeText}
        style={styles.searchBar}
        ref={searchBarRef}
      />
    )
  }, [onChangeText, searchBarRef, searchText, styles])

  const ListFooterComponent = useMemo(() => {
    return (
      <SafeAreaView edges={['bottom']}>
        <View style={styles.footer}>
          {isRequesting && <ActivityIndicator />}
        </View>
      </SafeAreaView>
    )
  }, [isRequesting, styles])

  return (
    <FlatList
      style={styles.container}
      data={items}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      onEndReached={onEndReached}
    />
  )
}

const Container: React.FC<Props> = (props) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [keyword, setKeyword] = useState<string>('')
  const searchBarRef = useRef<SearchBar | null>(null)

  const { items, loadMore, isLoading, error } = useSearchRepository(keyword)

  const onPress = useCallback(
    (repository: Repository) => {
      searchBarRef.current?.unFocus()
      navigation.navigate(MainName.Detail, { repository: repository })
    },
    [navigation],
  )

  const onChangeText = useCallback((text: string) => {
    setKeyword(text)
  }, [])

  const onEndReached = useCallback(() => {
    loadMore()
  }, [loadMore])

  useEffect(() => {
    if (error instanceof Error) {
      dispatch(enqueueToast({ message: error.message }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  return (
    <Component
      {...props}
      items={items}
      onPress={onPress}
      searchText={keyword}
      onChangeText={onChangeText}
      onEndReached={onEndReached}
      isRequesting={isLoading}
      searchBarRef={searchBarRef}
    />
  )
}

export { Container as Home }

const useStyles = makeStyles(useColorScheme, (colorScheme) => ({
  container: styleType<ViewStyle>({
    flex: 1,
    backgroundColor: COLOR(colorScheme).BACKGROUND.SECONDARY,
  }),
  searchBar: styleType<ViewStyle>({
    width: '100%',
    height: 60,
  }),
  footer: styleType<ViewStyle>({
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  }),
}))
