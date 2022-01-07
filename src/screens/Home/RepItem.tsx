import React from 'react'
import { Text, TextStyle, useColorScheme, View, ViewStyle } from 'react-native'
import { styleType } from '@/utils/styles'
import { Repository } from '@/api/github/Repository'
import { Button } from '@/components/Button'
import FastImage, { ImageStyle } from 'react-native-fast-image'
import { makeStyles } from 'react-native-swag-styles'
import { COLOR } from '@/CONSTANTS/COLOR'

type Props = {
  repository: Repository
  onPress: (repository: Repository) => void
}
type ComponentProps = Props & {}

const Component: React.FC<ComponentProps> = ({ repository, onPress }) => {
  const styles = useStyles()
  const { id, name, description, stars, watchers, owner } = repository
  return (
    <Button
      style={styles.container}
      onPress={() => onPress(repository)}
      key={id}
    >
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

const useStyles = makeStyles(useColorScheme, (colorScheme) => ({
  container: styleType<ViewStyle>({
    width: '100%',
    minHeight: 44,
    backgroundColor: COLOR(colorScheme).BACKGROUND.PRIMARY,
    padding: 16,
  }),
  ownerName: styleType<TextStyle>({
    color: COLOR(colorScheme).TEXT.PRIMARY,
    fontWeight: 'normal',
  }),
  ownerImage: styleType<ImageStyle>({
    width: 20,
    height: 20,
    marginRight: 4,
  }),
  repName: styleType<TextStyle>({
    color: COLOR(colorScheme).TEXT.PRIMARY,
    fontWeight: 'bold',
  }),
  description: styleType<TextStyle>({
    color: COLOR(colorScheme).TEXT.SECONDARY,
    fontWeight: 'normal',
  }),
  row: styleType<ViewStyle>({
    flexDirection: 'row',
  }),
  count: styleType<TextStyle>({
    color: COLOR(colorScheme).TEXT.PRIMARY,
    fontWeight: 'normal',
  }),
  spacer: styleType<ViewStyle>({
    width: 10,
  }),
  marginBottom: styleType<ViewStyle>({
    marginBottom: 4,
  }),
}))
