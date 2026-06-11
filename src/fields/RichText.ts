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

/**
 * Configuration properties for the custom RichText field.
 */
type RichTextProps = {
  /**
   * The database field name.
   * @default 'richText'
   */
  name?: string
  /**
   * The display label shown in the admin interface.
   */
  label?: string
  /**
   * Whether the field is mandatory.
   * @default true
   */
  required?: boolean
}

/**
 * Creates a standard rich text field configured with a Lexical editor and a custom toolbar featureset
 * tailored for portfolio descriptions.
 * 
 * @param props - Configuration properties for the field.
 * @returns A Payload Field configuration object.
 */
export const RichText = ({ name = 'richText', label, required = true }: RichTextProps = {}): Field => ({
  name,
  label,
  type: 'richText',
  localized: true,
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
