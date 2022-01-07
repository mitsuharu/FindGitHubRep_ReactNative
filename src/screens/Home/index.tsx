import React, { useCallback, useMemo, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
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
import { useDispatch, useSelector } from 'react-redux'
import { enqueueToast } from '@/redux/modules/toast/actions'
import {
  fetchRepositories,
  fetchRepositoriesMore,
} from '@/redux/modules/repository/actions'
import {
  selectRepositoryIsRequesting,
  selectRepositoryItems,
} from '@/redux/modules/repository/selectors'

type Props = {}
type ComponentProps = Props & {
  items: Repository[]
  onPress: (repository: Repository) => void
  searchText: string
  onChangeText: (text: string) => void
  onEndReached: () => void
  isRequesting: boolean
}

const Component: React.FC<ComponentProps> = ({
  items,
  onPress,
  searchText,
  onChangeText,
  onEndReached,
  isRequesting,
}) => {
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
      />
    )
  }, [onChangeText, searchText])

  const ListFooterComponent = useMemo(() => {
    return (
      <SafeAreaView edges={['bottom']}>
        <View style={styles.footer}>
          {isRequesting && <ActivityIndicator />}
        </View>
      </SafeAreaView>
    )
  }, [isRequesting])

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

  const onPress = useCallback(
    (repository: Repository) => {
      console.log(`onPress ${repository.name}`)
      dispatch(enqueueToast({ message: repository.name }))

      navigation.navigate(MainName.Detail)
    },
    [dispatch, navigation],
  )

  const [searchText, setSearchText] = useState<string>('')

  const onChangeText = useCallback(
    (text: string) => {
      console.log(`onChangeText ${text}`)
      setSearchText(text)
      dispatch(fetchRepositories({ keyword: text }))
    },
    [dispatch],
  )

  const onEndReached = useCallback(() => {
    dispatch(fetchRepositoriesMore())
  }, [dispatch])

  const items: Repository[] = useSelector(selectRepositoryItems)
  const isRequesting = useSelector(selectRepositoryIsRequesting)

  return (
    <Component
      {...props}
      items={items}
      onPress={onPress}
      searchText={searchText}
      onChangeText={onChangeText}
      onEndReached={onEndReached}
      isRequesting={isRequesting}
    />
  )
}

export { Container as Home }

const styles = StyleSheet.create({
  container: styleType<ViewStyle>({
    flex: 1,
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
})
