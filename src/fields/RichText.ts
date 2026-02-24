import type { Field } from 'payload'
import {
  lexicalEditor,
  FixedToolbarFeature,
  OrderedListFeature,
  UnorderedListFeature,
  ParagraphFeature,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  InlineCodeFeature,
} from '@payloadcms/richtext-lexical'

type RichTextProps = {
  name?: string
  label?: string
  required?: boolean
}

export const RichText = ({ name = 'richText', label, required = true }: RichTextProps = {}): Field => ({
  name,
  label,
  type: 'richText',
  required,
  editor: lexicalEditor({
    features: () => [
      FixedToolbarFeature(),
      OrderedListFeature(),
      UnorderedListFeature(),
      ParagraphFeature(),
      BoldFeature(),
      ItalicFeature(),
      UnderlineFeature(),
      StrikethroughFeature(),
      SubscriptFeature(),
      SuperscriptFeature(),
      InlineCodeFeature(),
    ],
  }),
})
