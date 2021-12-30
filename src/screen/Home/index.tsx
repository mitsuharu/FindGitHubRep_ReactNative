import React, { useCallback, useState } from 'react'
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import { styleType } from '@/utils/styles'
import { useNavigation } from '@react-navigation/native'
import { MainName } from '@/routes/main.constraint'
import SearchBar from 'react-native-search-bar'

type Props = {}
type ComponentProps = Props & {
  onPress: () => void
  searchText: string
  onChangeText: (text: string) => void
}

const Component: React.FC<ComponentProps> = ({
  onPress,
  searchText,
  onChangeText,
}) => {
  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search"
        text={searchText}
        onChangeText={onChangeText}
        style={styles.searchBar}
      />
      <Text style={styles.text} onPress={onPress}>
        home
      </Text>
    </View>
  )
}

const Container: React.FC<Props> = (props) => {
  const navigation = useNavigation()
  const onPress = useCallback(() => {
    navigation.navigate(MainName.Detail)
  }, [navigation])

  const [searchText, setSearchText] = useState<string>('')

  const onChangeText = useCallback((text: string) => {
    setSearchText(text)
  }, [])

  return (
    <Component
      {...props}
      onPress={onPress}
      searchText={searchText}
      onChangeText={onChangeText}
    />
  )
}

export { Container as Home }

const styles = StyleSheet.create({
  container: styleType<ViewStyle>({
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  text: styleType<TextStyle>({
    textAlign: 'center',
  }),
  searchBar: styleType<ViewStyle>({
    width: '100%',
    height: 50,
  }),
})
