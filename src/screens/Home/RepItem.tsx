import React from 'react'
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import { styleType } from '@/utils/styles'
import { Repository } from '@/api/github/Repository'
import { Button } from '@/components/Button'
import FastImage, { ImageStyle } from 'react-native-fast-image'

type Props = {
  repository: Repository
  onPress: (repository: Repository) => void
}
type ComponentProps = Props & {}

const Component: React.FC<ComponentProps> = ({ repository, onPress }) => {
  const { name, description, stars, watchers, owner } = repository
  return (
    <Button style={styles.container} onPress={() => onPress(repository)}>
      <View style={[styles.row, styles.marginBottom]}>
        <FastImage
          style={styles.ownerImage}
          source={{ uri: owner.avatarUrl }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text style={styles.ownerName}>{owner.name}</Text>
      </View>
      <Text style={[styles.repName, styles.marginBottom]}>{name}</Text>
      {!!description && (
        <Text style={[styles.description, styles.marginBottom]}>
          {description}
        </Text>
      )}
      <View style={[styles.row, styles.marginBottom]}>
        <Text style={styles.count}>⭐️</Text>
        <Text style={styles.count}>{stars.toLocaleString()}</Text>
        <View style={styles.spacer} />
        <Text style={styles.count}>👀</Text>
        <Text style={styles.count}>{watchers.toLocaleString()}</Text>
      </View>
    </Button>
  )
}

const Container: React.FC<Props> = (props) => {
  return <Component {...props} />
}

export { Container as RepItem }

const styles = StyleSheet.create({
  container: styleType<ViewStyle>({
    width: '100%',
    minHeight: 44,
    backgroundColor: 'white',
    padding: 16,
  }),
  ownerName: styleType<TextStyle>({
    fontWeight: 'normal',
  }),
  ownerImage: styleType<ImageStyle>({
    width: 20,
    height: 20,
    marginRight: 4,
  }),
  repName: styleType<TextStyle>({
    fontWeight: 'bold',
  }),
  description: styleType<TextStyle>({
    fontWeight: 'normal',
  }),
  row: styleType<ViewStyle>({
    flexDirection: 'row',
  }),
  count: styleType<TextStyle>({
    fontWeight: 'bold',
  }),
  spacer: styleType<ViewStyle>({
    width: 10,
  }),
  marginBottom: styleType<ViewStyle>({
    marginBottom: 4,
  }),
})
