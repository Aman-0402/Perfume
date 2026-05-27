import { motion } from 'framer-motion'
import { NOTES } from '../../../data/notes'

const MAX = 2

function NoteChip({ note, selected, onToggle, disabled }) {
  return (
    <motion.button
      onClick={() => onToggle(note)}
      disabled={disabled && !selected}
      whileHover={{ scale: disabled && !selected ? 1 : 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={[
        'px-3.5 py-1.5 text-[10px] tracking-[0.25em] uppercase transition-all duration-300 outline-none flex-shrink-0',
        'border cursor-pointer',
        selected
          ? 'bg-gold-400 text-black border-gold-400'
          : disabled
          ? 'border-gold-400/10 text-brown/25 cursor-not-allowed'
          : 'border-gold-400/30 text-brown-light hover:border-gold-400/60 hover:text-brown',
      ].join(' ')}
    >
      {note}
    </motion.button>
  )
}

function NoteLayer({ label, sublabel, notes, selected, onToggle }) {
  const atMax = selected.length >= MAX

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline gap-3">
        <h3 className="font-heading text-lg text-brown">{label}</h3>
        <span className="text-[10px] tracking-[0.18em] uppercase text-brown-light font-medium">{sublabel}</span>
        <span className="text-[9px] tracking-[0.25em] uppercase text-gold-400/72 ml-auto">
          {selected.length}/{MAX}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {notes.map((note) => (
          <NoteChip
            key={note}
            note={note}
            selected={selected.includes(note)}
            onToggle={onToggle}
            disabled={atMax && !selected.includes(note)}
          />
        ))}
      </div>
    </div>
  )
}

export default function Step2Notes({ selections, update }) {
  const { family, topNotes, middleNotes, baseNotes } = selections
  const notes = NOTES[family] || { top: [], middle: [], base: [] }

  function toggle(layer, note) {
    const key = `${layer}Notes`
    const current = selections[key]
    const next = current.includes(note)
      ? current.filter((n) => n !== note)
      : current.length < MAX
      ? [...current, note]
      : current
    update({ [key]: next })
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="editorial-label mb-2">Step 2 of 5</p>
        <h2 className="font-heading text-3xl md:text-4xl text-brown mb-2">
          Choose Your <span className="italic" style={{ color: '#9A6127' }}>Notes</span>
        </h2>
        <p className="text-[15px] font-normal leading-[1.85]" style={{ color: '#5C4638' }}>
          Pick up to 2 per layer — or skip and leave it to us.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-8"
      >
        {/* Note layer guide */}
        <div className="flex gap-4 text-[10px] tracking-[0.16em] uppercase font-medium">
          <span className="text-gold-400/72">Top ↑ First impression</span>
          <span style={{ color: 'rgba(43,22,13,0.18)' }}>·</span>
          <span style={{ color: '#5C4638' }}>Middle ↕ Heart</span>
          <span style={{ color: 'rgba(43,22,13,0.26)' }}>·</span>
          <span style={{ color: '#5C4638' }}>Base ↓ Lasting depth</span>
        </div>

        <div className="h-px bg-gold-400/8" />

        <NoteLayer
          label="Top Notes"
          sublabel="First 15 min"
          notes={notes.top}
          selected={topNotes}
          onToggle={(n) => toggle('top', n)}
        />

        <div className="h-px bg-gold-400/8" />

        <NoteLayer
          label="Middle Notes"
          sublabel="Heart · 30 min–4 hrs"
          notes={notes.middle}
          selected={middleNotes}
          onToggle={(n) => toggle('middle', n)}
        />

        <div className="h-px bg-gold-400/8" />

        <NoteLayer
          label="Base Notes"
          sublabel="Soul · Lingers for hours"
          notes={notes.base}
          selected={baseNotes}
          onToggle={(n) => toggle('base', n)}
        />
      </motion.div>

      {/* Skip hint */}
      <p className="text-[10px] tracking-[0.2em] uppercase text-center" style={{ color: 'rgba(92,70,56,0.72)' }}>
        Skipping a layer? Our perfumers will choose for you ✦
      </p>
    </div>
  )
}
