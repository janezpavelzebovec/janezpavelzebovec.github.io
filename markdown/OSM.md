---
title: Oznake v OSM
date: 2025-11-30
description: Nekaj izbranih oznak za označevanje v OpenStretMap
keywords: OpenStreetMap
---

# Župnija

```
name=Župnija Preska
religion=christian
denomination=roman_catholic
deanery=Ljubljana - Šentvid
diocese=Škofija Ljubljana

```

Lahko tudi `boundary=religious_administration`

## Župnijska cerkev

```
name=Župnijska cerkev Janeza Krstnika

amenity=place_of_worship
building=church
religion=christian
denomination=roman_catholic
church:type=parish

parish=Župnija Preska
deanery=Dekanija Ljubljana - Šentvid
diocese=Nadškofija Ljubljana

parish:website=http://zupnija-preska.rkc.si/
parish:wikidata=Q60355770
parish:wikipedia=sl:Župnija Preska
```

## Župnišče

```
addr:city=Kraj
addr:housenumber=42
addr:postcode=1000
addr:street=cesta

name=Župnišče župnije
short_name=Župnišče

building=church-office
office=parish

parish=Župnija
deanery=Dekanija
diocese=Škofija

website=http://www.
phone=1
contact:email=@
parish:wikidata=Q
parish:wikipedia=sl:Župnija
```

Morda za oskrbovano župnijo iz druge župnije:

```
administered_by=Župnija
```

## Podružnična cerkev

```
name=Cerkev Sv. Bride
short_name=Sv. Brida
full_name=Podružnična cerkev sv. Lucije, mučenke

amenity=place_of_worship
building=church
religion=christian
denomination=roman_catholic
church:type=filial

parish=Župnija Ankaran
deanery=Dekanija Dekani
diocese=Škofija Koper
```

## Kapela

```
name=Cerkev Sv. Bride

amenity=place_of_worship
building=chapel
religion=christian
denomination=roman_catholic

parish=Župnija Ankaran
deanery=Dekanija Dekani
diocese=Škofija Koper
```


### Bolnišnična kapela

```
building:part=chapel
chapel:type=hospital
```

### Pokopališka kapela

```
chapel:type=grave_yard
```

### Pokopališka vežica

```
amenity=place_of_mourning
```

## Zvonik

```
building:part=tower
man_made=tower
tower:type=bell_tower
```

### Samostoječ

```
building=tower
tower:type=bell_tower
man_made=tower
```

## Pokopališče okoli cerkve

```
amenity=grave_yard
landuse=cemetry

parish=Župnija Ankaran
```

## Parkirišče

```
amenity=parking
fee=no/yes
parking=surface/street_side
capacity=*
orientation=parallel/diagonal/perpendicular
surface=asphalt
```

# Spomeniki

```
historic=memorial
wikidata=Q*
```
## NOB

```
historic=memorial
memorial=war_memorial
memorial:conflict=WW2
wikidata=Q*
subject=NOB
subject:wikidata=Q1565371
```

# Omrežje

## Elektrika

[`power=*`](https://wiki.openstreetmap.org/wiki/Key:power)

`power=line` – daljnovod
`power=tower` – daljnovodni stolp

`power=minor_line` – manj pomemben daljnovod
`power=pole` – daljnovodni steber

`power=terminal` – električni stolp

[Prehodni steber daljnovoda](https://wiki.openstreetmap.org/wiki/Tag:location:transition%3Dyes)

```
power=pole
location:transition=yes
line_management=transition
```
